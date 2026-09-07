import GeradorMoldura from './GeradorMoldura'

export default function Moldura() {
  return (
    <section className="secao secao--creme" id="moldura">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Apoie nas redes</p>
          <h2 className="titulo-secao">
            Coloque a sua foto na moldura da <span className="grifo">campanha.</span>
          </h2>
          <p className="chamada">
            Escolha o modelo, coloque a sua foto, baixe e publique. Leva menos de um
            minuto — e a sua foto não sai do seu aparelho.
          </p>
          <p style={{ marginTop: '18px' }}>
            <a className="btn btn--contorno" href="/moldura">
              Abrir a página exclusiva da moldura
            </a>
          </p>
        </div>

        <div className="revelar">
          <GeradorMoldura />
        </div>
      </div>
    </section>
  )
}
