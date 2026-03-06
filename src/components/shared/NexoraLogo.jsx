'use client'

export default function NexoraLogo({ size = 32, color = "#FF0000" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="nexoraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#CC0000" />
        </linearGradient>
      </defs>
      <path
        d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z"
        fill="url(#nexoraGrad)"
        strokeLinejoin="round"
      />
      <path
        d="M25 95V25L55 65V25"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}