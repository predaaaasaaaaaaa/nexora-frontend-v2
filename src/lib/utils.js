import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getPlatformColor(platform) {
  const colors = {
    instagram: 'from-purple-600 to-pink-600',
    youtube: 'from-red-600 to-red-700',
    tiktok: 'from-black to-gray-800',
    twitter: 'from-blue-400 to-blue-600',
  }
  return colors[platform] || 'from-gray-600 to-gray-700'
}

export function getPlatformIcon(platform) {
  const icons = {
    instagram: '📷',
    youtube: '▶️',
    tiktok: '🎵',
    twitter: '🐦',
  }
  return icons[platform] || '📱'
}
