import { bandeiras } from '../dados/conteudo'
import Icone from './Icones'

export default function Bandeiras() {
  return (
    <section className="secao" id="bandeiras">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">As seis bandeiras</p>
          <h2 className="titulo-secao">
            O que ela defende, e por que <span className="destaque">conhece o assunto</span>.
          </h2>
          <p className="chamada">
            Nenhuma dessas pautas é novidade na vida dela. Todas vêm de algum lugar
            concreto.
          </p>
        </div>

        <div className="cartoes revelar">
          {bandeiras.map((item) => (
            <article className="cartao" key={item.titulo}>
              <div className="cartao__icone" aria-hidden="true">
                <Icone nome={item.icone} />
              </div>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
