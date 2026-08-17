import { leis } from '../dados/conteudo'

export default function Leis() {
  return (
    <section className="secao secao--creme" id="leis">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Assinatura dela nas leis do município</p>
          <h2 className="titulo-secao">
            Não é promessa. Já <span className="grifo">virou lei.</span>
          </h2>
          <p className="chamada">
            Projetos de autoria de Laís Helena que se tornaram lei em Valinhos ao longo
            dos três mandatos como vereadora.
          </p>
        </div>

        <div className="cartoes revelar">
          {leis.map((lei) => (
            <article className="cartao" key={lei.titulo}>
              <h3>{lei.titulo}</h3>
              <p>{lei.detalhe}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
