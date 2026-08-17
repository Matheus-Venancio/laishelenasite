import { cidades } from '../dados/conteudo'

export default function Regiao() {
  return (
    <section className="secao secao--creme" id="regiao">
      <div className="container regiao__grade">
        <div className="revelar">
          <p className="olho">Onde ela trabalha</p>
          <h2 className="titulo-secao">
            Raiz em Valinhos, compromisso com toda a região.
          </h2>
          <p className="chamada">
            A Região Metropolitana de Campinas concentra milhões de pessoas e divide os
            mesmos problemas: fila na saúde, transporte, segurança e escola. Laís Helena
            conhece essa realidade de dentro e quer representar essa região em
            Brasília.
          </p>

          <div className="cidades">
            {cidades.map((cidade) => (
              <p className="cidade" key={cidade}>
                <span className="cidade__pino" aria-hidden="true" />
                {cidade}
              </p>
            ))}
          </div>
        </div>

        <div className="regiao__foto revelar">
          <img
            src="/fotos/lais-regiao-1200.webp"
            srcSet="/fotos/lais-regiao-800.webp 800w, /fotos/lais-regiao-1200.webp 1200w, /fotos/lais-regiao.webp 1800w"
            sizes="(max-width: 960px) 92vw, 540px"
            width="1200"
            height="674"
            alt="Laís Helena em frente ao letreiro “Eu amo Valinhos”, no parque municipal."
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
