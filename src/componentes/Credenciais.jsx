import { credenciais } from '../dados/conteudo'

export default function Credenciais() {
  return (
    <section className="credenciais" aria-label="Trajetória em números">
      <div className="container">
        <div className="credenciais__grade revelar">
          {credenciais.map((item) => (
            <div className="credencial" key={item.texto}>
              <strong>{item.valor}</strong>
              <span>{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
