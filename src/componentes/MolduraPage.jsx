import { useEffect } from 'react'
import { config, linkWhatsapp } from '../dados/conteudo'
import GeradorMoldura from './GeradorMoldura'
import Icone from './Icones'

// Página dedicada: /moldura
export default function MolduraPage() {
  useEffect(() => {
    document.title = `Estou com a ${config.nomeUrna} — monte a sua foto de apoio ${config.numero}`
  }, [])

  const redes = [
    { nome: 'instagram', href: config.instagram, rotulo: 'Instagram' },
    { nome: 'facebook', href: config.facebook, rotulo: 'Facebook' },
    { nome: 'youtube', href: config.youtube, rotulo: 'YouTube' },
    { nome: 'whatsapp', href: linkWhatsapp, rotulo: 'WhatsApp' },
  ]

  return (
    <div className="pagina-moldura">
      <header className="cabecalho cabecalho--fixo">
        <div className="container cabecalho__interno">
          <a className="marca" href="/">
            <span className="marca__selo" aria-hidden="true">
              LH
            </span>
            <span className="marca__texto">
              <span className="marca__nome">Laís Helena</span>
              <span className="marca__cargo">
                {config.cargo} · {config.numero}
              </span>
            </span>
          </a>
          <a className="btn btn--contorno" href="/">
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="secao">
        <div className="container">
          <div className="cabecalho-secao">
            <p className="olho">Campanha de apoio</p>
            <h1 className="titulo-secao" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)' }}>
              Estou com a Laís Helena {config.numero}
            </h1>
            <p className="chamada">
              Mostre o seu apoio nas redes sociais. Escolha o modelo, coloque a sua
              foto, baixe e publique.
            </p>

            <ol className="passos" style={{ marginTop: '22px' }}>
              <li>
                <b>1</b>
                <span>Escolha o modelo</span>
              </li>
              <li>
                <b>2</b>
                <span>Coloque a sua foto</span>
              </li>
              <li>
                <b>3</b>
                <span>Baixe e publique</span>
              </li>
            </ol>
          </div>

          <GeradorMoldura />

          <p className="gerador__privacidade">
            <strong>A sua privacidade em primeiro lugar.</strong> Nenhuma foto é
            enviada para a internet nem armazenada em qualquer servidor. Toda a
            montagem acontece dentro do seu próprio celular ou computador.
          </p>
        </div>
      </main>

      <footer className="rodape">
        <div className="container">
          <div className="sociais" style={{ justifyContent: 'center', marginTop: 0 }}>
            {redes.map((rede) => (
              <a
                key={rede.nome}
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${rede.rotulo} da campanha`}
              >
                <Icone nome={rede.nome} />
              </a>
            ))}
          </div>
          <p className="rodape__legal" style={{ textAlign: 'center', marginTop: '22px' }}>
            <span className="selo-legal">
              <strong className="selo-legal__identificacao">
                {config.identificacaoLegal}
              </strong>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
