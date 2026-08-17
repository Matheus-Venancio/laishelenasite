import { trajetoria } from '../dados/conteudo'

export default function Trajetoria() {
  return (
    <section className="secao secao--creme" id="trajetoria">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Linha do tempo</p>
          <h2 className="titulo-secao">
            Trinta anos de vida pública, marco por marco.
          </h2>
          <p className="chamada">
            Da primeira lei em defesa da mulher, em 1993, até a cadeira de prefeita de
            Valinhos. Cada etapa foi construída no trabalho, não no atalho.
          </p>
        </div>

        <ol className="linha-tempo revelar">
          {trajetoria.map((marco) => (
            <li className="marco" key={`${marco.ano}-${marco.titulo}`}>
              <p className="marco__ano">{marco.ano}</p>
              <h3>{marco.titulo}</h3>
              <p>{marco.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
