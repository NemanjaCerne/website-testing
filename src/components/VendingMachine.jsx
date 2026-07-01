export default function VendingMachine() {
  return (
    <svg
      viewBox="0 0 300 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#131313" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ff2d78" stopOpacity="0.04" />
        </linearGradient>
        <filter id="neonBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="neonPink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Main body ── */}
      <rect x="2" y="2" width="296" height="516" rx="18" fill="url(#bodyGrad)" stroke="#1e1e1e" strokeWidth="1.5" />

      {/* ── Top neon pink strip ── */}
      <rect x="2" y="2" width="296" height="4" rx="2" fill="#ff2d78" opacity="0.9" filter="url(#neonPink)" />

      {/* ── Header area ── */}
      <rect x="2" y="2" width="296" height="72" rx="18" fill="#0f0f0f" />
      <rect x="2" y="54" width="296" height="20" fill="#0f0f0f" />

      {/* Brand text */}
      <text x="150" y="34" textAnchor="middle" fill="#ff2d78" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif" letterSpacing="4">
        HUSTLE
      </text>
      <text x="150" y="56" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="500" fontFamily="Space Grotesk, sans-serif" letterSpacing="6" opacity="0.7">
        VENDING
      </text>

      {/* Neon underline */}
      <line x1="20" y1="72" x2="280" y2="72" stroke="#ff2d78" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="72" x2="280" y2="72" stroke="#ff2d78" strokeWidth="3" opacity="0.15" filter="url(#neonPink)" />

      {/* ── Glass panel ── */}
      <rect id="vm-glass" x="18" y="82" width="264" height="300" rx="8" fill="#070707" stroke="#1a1a1a" strokeWidth="1.5" />

      {/* Glass glow — fades in during scroll */}
      <rect id="vm-glass-glow" x="18" y="82" width="264" height="300" rx="8" fill="url(#glassGrad)" opacity="0" />
      <rect id="vm-glass-glow2" x="18" y="82" width="264" height="300" rx="8" fill="url(#glowCenter)" opacity="0" />

      {/* Glass reflection */}
      <rect x="22" y="86" width="8" height="290" rx="4" fill="#ffffff" opacity="0.02" />

      {/* ── Slot dividers (decorative — HTML links overlay these) ── */}
      {/* Row 1 */}
      <rect x="28" y="92" width="114" height="130" rx="6" fill="#0b0b0b" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="158" y="92" width="114" height="130" rx="6" fill="#0b0b0b" stroke="#1e1e1e" strokeWidth="1" />
      {/* Row 2 */}
      <rect x="28" y="242" width="114" height="130" rx="6" fill="#0b0b0b" stroke="#1e1e1e" strokeWidth="1" />
      <rect x="158" y="242" width="114" height="130" rx="6" fill="#0b0b0b" stroke="#1e1e1e" strokeWidth="1" />

      {/* Horizontal divider inside glass */}
      <line x1="28" y1="232" x2="272" y2="232" stroke="#1e1e1e" strokeWidth="1" />
      {/* Vertical divider */}
      <line x1="150" y1="92" x2="150" y2="382" stroke="#1e1e1e" strokeWidth="1" />

      {/* ── Left side neon strip ── */}
      <rect id="vm-strip-left" x="2" y="82" width="3" height="300" fill="#00d4ff" opacity="0.5" filter="url(#neonBlue)" />

      {/* ── Right side neon strip ── */}
      <rect id="vm-strip-right" x="295" y="82" width="3" height="300" fill="#ff2d78" opacity="0.5" filter="url(#neonPink)" />

      {/* ── Control panel ── */}
      <rect x="18" y="392" width="264" height="100" rx="8" fill="#0d0d0d" stroke="#1a1a1a" strokeWidth="1" />

      {/* Payment display */}
      <rect x="30" y="402" width="100" height="40" rx="4" fill="#060606" stroke="#1e1e1e" strokeWidth="1" />
      <text x="80" y="418" textAnchor="middle" fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity="0.7">READY</text>
      <text x="80" y="432" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.9">$0.00</text>

      {/* Coin slot */}
      <rect x="30" y="452" width="100" height="6" rx="3" fill="#1a1a1a" stroke="#222" strokeWidth="1" />
      <text x="80" y="470" textAnchor="middle" fill="#333" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="1">INSERT COIN</text>

      {/* Keypad */}
      {[0,1,2].map(col => [0,1,2].map(row => (
        <circle
          key={`${col}-${row}`}
          cx={162 + col * 22}
          cy={410 + row * 22}
          r="7"
          fill="#111"
          stroke="#1e1e1e"
          strokeWidth="1"
        />
      )))}
      {/* Enter button (blue) */}
      <rect x="152" y="472" width="66" height="14" rx="4" fill="#00d4ff" opacity="0.15" stroke="#00d4ff" strokeWidth="0.5" />
      <text x="185" y="483" textAnchor="middle" fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity="0.8">ENTER</text>

      {/* ── Collection tray ── */}
      <rect x="50" y="500" width="200" height="14" rx="7" fill="#0d0d0d" stroke="#1a1a1a" strokeWidth="1" />
      <rect x="70" y="504" width="160" height="6" rx="3" fill="#111" />

      {/* ── Top vents ── */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={100 + i * 20} y1="10" x2={100 + i * 20} y2="18" stroke="#1e1e1e" strokeWidth="1.5" strokeLinecap="round" />
      ))}

      {/* ── Bottom neon accent ── */}
      <line x1="50" y1="516" x2="250" y2="516" stroke="#00d4ff" strokeWidth="1" opacity="0.3" filter="url(#neonBlue)" />
    </svg>
  )
}
