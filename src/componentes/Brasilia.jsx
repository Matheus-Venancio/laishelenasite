import { compromissos } from '../dados/conteudo'

export default function Brasilia() {
  return (
    <section className="secao secao--rosa" id="brasilia">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Por que Brasília</p>
          <h2 className="titulo-secao">
            As decisões que faltam para Valinhos e região são tomadas no Congresso.
          </h2>
          <p className="chamada">
            Fundos da educação, financiamento do SUS, fiscalização da Lei Maria da
            Penha, recurso da assistência social: quase tudo o que Laís Helena já
            executou no município é decidido em Brasília. É lá que ela quer continuar
            essa luta com a experiência de quem já geriu essas pautas de perto.
          </p>
        </div>

        <div className="brasilia__grade">
          <div className="revelar">
            <ul className="compromissos">
              {compromissos.map((item) => (
                <li key={item.titulo}>
                  <div>
                    <b>{item.titulo}</b>
                    <span>{item.texto}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="brasilia__nota">
              Os itens acima são compromissos de atuação parlamentar. A aprovação de
              leis e a destinação de recursos dependem do Congresso Nacional e dos
              trâmites previstos em lei.
            </p>
          </div>

          <figure className="brasilia__foto revelar">
            <img
              src="/fotos/lais-conversando-1200.webp"
              srcSet="/fotos/lais-conversando-800.webp 800w, /fotos/lais-conversando-1200.webp 1200w, /fotos/lais-conversando.webp 1800w"
              sizes="(max-width: 960px) 92vw, 540px"
              width="1200"
              height="674"
              alt="Laís Helena conversando na rua com duas moradoras, ouvindo com atenção."
              loading="lazy"
              decoding="async"
            />
            <figcaption className="brasilia__legenda">
              A pauta não nasce em gabinete. Nasce na conversa de calçada.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
