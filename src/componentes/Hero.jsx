import { config } from '../dados/conteudo'

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <span className="hero__bolha hero__bolha--1" aria-hidden="true" />
      <span className="hero__bolha hero__bolha--2" aria-hidden="true" />

      <div className="container hero__grade">
        <div className="hero__texto">
          <p className="hero__tarja">
            <b>{config.cargo}</b>
            <span>
              {config.partido} · {config.estado}
            </span>
          </p>

          <h1>
            Firme para defender,
            <em>preparada para fazer.</em>
          </h1>

          <p className="hero__sub">
            Professora e a primeira mulher a ocupar o
            Legislativo e o Executivo de Valinhos. Agora, candidata a Deputada Federal
            por São Paulo.
          </p>

          <div className="hero__acoes">
            <a className="btn btn--primario" href="#participe">
              Quero apoiar
            </a>
            <a className="btn btn--contorno" href="#historia">
              Conhecer a história
            </a>
          </div>

          <p className="hero__numero">
            <strong>{config.numero}</strong>
            <span>
              Digite {config.numero}
              <br />
              na urna
            </span>
          </p>
        </div>

        <div className="hero__foto">
          <picture>
            <source
              type="image/webp"
              srcSet="/fotos/lais-recorte-700.webp 700w, /fotos/lais-recorte-1000.webp 1000w, /fotos/lais-recorte.webp 1400w"
              sizes="(max-width: 960px) 90vw, 480px"
            />
            <img
              src="/fotos/lais-recorte-1000.png"
              width="1000"
              height="1101"
              alt={`${config.nomeUrna}, candidata a ${config.cargo} por ${config.estado}, sorrindo de blazer branco e camisa rosa.`}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <p className="hero__adesivo">
            30 anos de vida pública. Nenhum dia longe da gente.
          </p>
        </div>
      </div>
    </section>
  )
}
