import brandMark from '../../../assets/waylight-logo.png'

export function Brand({ label }) {
  return (
    <a className="brand" href="#top" aria-label={`${label} — на главную`}>
      <img src={brandMark} alt="" className="brand-mark" />
      <span>{label}</span>
    </a>
  )
}
