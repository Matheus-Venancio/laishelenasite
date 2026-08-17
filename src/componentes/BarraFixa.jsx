import { config, linkWhatsapp } from '../dados/conteudo'

export default function BarraFixa() {
  return (
    <div className="barra-fixa">
      <a className="btn btn--contorno" href="#como-votar">
        Votar {config.numero}
      </a>
      <a
        className="btn btn--primario"
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        Quero apoiar
      </a>
    </div>
  )
}
