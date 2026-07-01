import { BarChart2, TrendingUp, ShieldCheck, FileText, Users, Building2 } from 'lucide-react'

const items = [
  { label: 'Contabilidad', Icon: BarChart2 },
  { label: 'Tributación SUNAT', Icon: FileText },
  { label: 'Planillas RR.HH.', Icon: Users },
  { label: 'Asesoría Fiscal', Icon: TrendingUp },
  { label: 'Auditoría', Icon: ShieldCheck },
  { label: 'Libros Electrónicos', Icon: FileText },
  { label: 'Constitución de Empresas', Icon: Building2 },
  { label: 'Trámites SUNARP', Icon: ShieldCheck },
]

export function TickerSection() {
  const track = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background:   '#ffffff',
        borderTop:    '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #ffffff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, #ffffff, transparent)' }} />

      <div className="ticker-track flex items-center gap-0" aria-hidden="true">
        {track.map(({ label, Icon }, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap select-none"
            style={{ padding: '0 2rem' }}
          >
            <Icon size={12} style={{ color: 'rgba(0,0,0,0.15)', flexShrink: 0 }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(0,0,0,0.25)' }}
            >
              {label}
            </span>
            <span style={{ color: '#1a4b8c', fontSize: '6px', flexShrink: 0 }}>&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
