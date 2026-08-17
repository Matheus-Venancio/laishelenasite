import { sobre } from '../dados/conteudo'

export default function Sobre() {
  return (
    <section className="secao" id="historia">
      <div className="container sobre__grade">
        <div className="sobre__midia revelar">
          <img
            src="/fotos/lais-retrato-800.webp"
            srcSet="/fotos/lais-retrato-560.webp 560w, /fotos/lais-retrato-800.webp 800w, /fotos/lais-retrato.webp 1200w"
            sizes="(max-width: 960px) 88vw, 420px"
            width="800"
            height="1066"
            alt="Retrato da professora Laís Helena sorrindo, de blazer branco e camisa rosa."
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="revelar">
          <p className="olho">Quem é Laís Helena</p>
          <h2 className="titulo-secao">
            Antes da política, a <span className="destaque">sala de aula</span>.
          </h2>

          <div className="texto-corrido" style={{ marginTop: '22px' }}>
            {sobre.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="sobre__citacao">
            “{sobre.citacao}”
            <cite>{sobre.autoria}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
