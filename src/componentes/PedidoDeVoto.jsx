import { config, linkCompartilhar } from '../dados/conteudo'
import Icone from './Icones'

export default function PedidoDeVoto() {
  return (
    <section className="pedido" aria-labelledby="pedido-titulo">
      <div className="container pedido__grade">
        <div className="pedido__foto revelar">
          <picture>
            <source
              type="image/webp"
              srcSet="/fotos/lais-bracos-560.webp 560w, /fotos/lais-bracos-800.webp 800w, /fotos/lais-bracos.webp 1200w"
              sizes="(max-width: 960px) 62vw, 360px"
            />
            <img
              src="/fotos/lais-bracos-800.png"
              width="800"
              height="1259"
              alt="Professora Laís Helena de braços cruzados, sorrindo, com blazer branco."
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        <div className="pedido__texto revelar">
          <p className="olho">Peço o seu voto</p>
          <h2 className="titulo-secao" id="pedido-titulo">
            {config.slogan}
          </h2>
          <p className="chamada">
            Brasília precisa de quem
            defende educação, mulher, saúde e assistência social com quem entende do
            assunto na prática.
          </p>

          <p className="pedido__numero">
            <span>{config.cargo}</span>
            <strong>{config.numero}</strong>
          </p>

          <div className="hero__acoes">
            <a className="btn btn--amarelo" href="#participe">
              Quero ajudar a eleger
            </a>
            <a
              className="btn btn--fantasma-claro"
              href={linkCompartilhar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icone nome="compartilhar" style={{ width: 19, height: 19 }} />
              Compartilhar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
