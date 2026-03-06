'use client'

export default function ChannelAvatar({ src, name, size = 44 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Channel'}
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          objectFit: 'cover',
          border: '2px solid rgba(255,0,0,0.3)',
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #FF0000, #CC0000)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: size * 0.42,
        fontWeight: 700,
        border: '2px solid rgba(255,0,0,0.3)',
      }}
    >
      {(name || '?')[0].toUpperCase()}
    </div>
  )
}