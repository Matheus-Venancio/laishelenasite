import { config, passosVoto, linkCompartilhar } from '../dados/conteudo'
import Icone from './Icones'

export default function ComoVotar() {
  return (
    <section className="secao" id="como-votar">
      <div className="container votar__grade">
        <div className="revelar">
          <p className="olho">Como votar</p>
          <h2 className="titulo-secao">
            São quatro números: <span className="destaque">{config.numero}</span>.
          </h2>
          <p className="chamada">
            Deputado federal se vota com quatro dígitos. Guarde o número, conte para a
            sua família e confirme o nome na tela antes de apertar CONFIRMA.
          </p>

          <ol className="passos">
            {passosVoto.map((passo, i) => (
              <li key={passo}>
                <b>{i + 1}</b>
                <span>{passo}</span>
              </li>
            ))}
          </ol>

          <div className="hero__acoes">
            <a
              className="btn btn--primario"
              href={linkCompartilhar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icone nome="compartilhar" style={{ width: 19, height: 19 }} />
              Compartilhar no WhatsApp
            </a>
          </div>
        </div>

        <div className="revelar">
          <div className="urna" role="img" aria-label={`Simulação da urna eletrônica com o número ${config.numero} digitado para o cargo de Deputada Federal`}>
            <div className="urna__visor">
              <p className="urna__rotulo">Deputada Federal</p>
              <div className="urna__digitos" aria-hidden="true">
                {config.numero.split('').map((d, i) => (
                  <b key={`${d}-${i}`}>{d}</b>
                ))}
              </div>
              <p className="urna__nome">
                <em>Nome</em>
                {config.nomeUrna}
                <em style={{ marginTop: '6px' }}>Partido</em>
                {config.partido}
              </p>
            </div>
            <div className="urna__teclas" aria-hidden="true">
              <span>Branco</span>
              <span className="laranja">Corrige</span>
              <span className="verde">Confirma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
