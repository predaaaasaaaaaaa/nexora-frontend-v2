'use client'

// Single source of truth for "what plan is the user on" and "is their
// YouTube account connected". Before this, every dashboard navigation
// fired getCurrentPlan() from the layout, the PlanBadge, and the
// individual page (coach, ideas) — 3+ concurrent calls per nav, each
// of which the backend resolves with ~5 DB queries. At a few thousand
// daily users that dominates DB load for no useful reason.
//
// This provider:
//   - Fetches plan + YouTube status ONCE on mount (gated by `enabled`,
//     which the layout flips on once auth has resolved).
//   - Exposes `refreshPlan` / `refreshYouTube` so pages can re-pull
//     after a mutation (e.g. after generateIdeas() consumes a quota
//     slot, or after Settings disconnects YouTube).
//   - Does NOT refetch on pathname change. Tab switches are free.

import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { getCurrentPlan, getYouTubeStatus } from '@/lib/api'
import { log } from '@/lib/log'

const DashboardDataContext = createContext({
  plan: null,
  ytStatus: null,
  planLoaded: false,
  ytLoaded: false,
  refreshPlan: async () => {},
  refreshYouTube: async () => {},
})

export const useDashboardData = () => useContext(DashboardDataContext)
export const useUserPlan = () => {
  const { plan, planLoaded, refreshPlan } = useDashboardData()
  return { plan, planLoaded, refreshPlan }
}
export const useYouTubeStatus = () => {
  const { ytStatus, ytLoaded, refreshYouTube } = useDashboardData()
  return { ytStatus, ytLoaded, refreshYouTube }
}

export default function DashboardDataProvider({ children, enabled = true }) {
  const [plan, setPlan] = useState(null)
  const [planLoaded, setPlanLoaded] = useState(false)
  const [ytStatus, setYtStatus] = useState(null)
  const [ytLoaded, setYtLoaded] = useState(false)
  // Guard against StrictMode double-invocation in dev firing the initial
  // fetches twice — we want strictly one of each per session.
  const initFiredRef = useRef(false)

  const refreshPlan = useCallback(async () => {
    try {
      const r = await getCurrentPlan()
      if (r?.success) {
        setPlan(r)
      } else if (r) {
        // Backend responded but didn't mark success — surface so we
        // notice if the contract changes. Don't clobber existing plan.
        log.warn('[plan] non-success payload', r)
      }
    } catch (err) {
      // Don't clobber a previously-loaded plan on a transient blip
      // (FM2 will lean on this same behaviour).
      log.warn('[plan] refresh failed', err?.message || err)
    } finally {
      setPlanLoaded(true)
    }
  }, [])

  const refreshYouTube = useCallback(async () => {
    try {
      const r = await getYouTubeStatus()
      setYtStatus(r || { connected: false })
    } catch (err) {
      log.warn('[yt] refresh failed', err?.message || err)
      setYtStatus({ connected: false })
    } finally {
      setYtLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    if (initFiredRef.current) return
    initFiredRef.current = true
    refreshPlan()
    refreshYouTube()
  }, [enabled, refreshPlan, refreshYouTube])

  const value = useMemo(
    () => ({ plan, ytStatus, planLoaded, ytLoaded, refreshPlan, refreshYouTube }),
    [plan, ytStatus, planLoaded, ytLoaded, refreshPlan, refreshYouTube]
  )

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  )
}
