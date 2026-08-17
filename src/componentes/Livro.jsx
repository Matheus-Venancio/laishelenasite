import { livro, linkWhatsapp } from '../dados/conteudo'

export default function Livro() {
  return (
    <section className="secao livro" id="livro">
      <div className="container livro__grade">
        <div className="livro__capa revelar">
          <small>Biografia · {livro.ano}</small>
          <div>
            <strong>{livro.titulo}</strong>
            <span style={{ display: 'block', marginTop: '10px' }}>
              {livro.subtitulo}
            </span>
          </div>
          <span>Laís Helena Antonio dos Santos Aloise</span>
        </div>

        <div className="revelar">
          <p className="olho">O livro</p>
          <h2 className="titulo-secao">
            “{livro.titulo} — {livro.subtitulo}”
          </h2>
          {livro.paragrafos.map((p, i) => (
            <p className="chamada" key={i}>
              {p}
            </p>
          ))}
          <div className="hero__acoes">
            <a
              className="btn btn--amarelo"
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero saber sobre o livro
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
