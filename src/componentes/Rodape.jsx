import { config, navegacao, linkWhatsapp } from '../dados/conteudo'
import Icone from './Icones'

const anoEleitoral = 2026

export default function Rodape() {
  const sociais = [
    { nome: 'instagram', href: config.instagram, rotulo: 'Instagram' },
    { nome: 'facebook', href: config.facebook, rotulo: 'Facebook' },
    { nome: 'youtube', href: config.youtube, rotulo: 'YouTube' },
    { nome: 'whatsapp', href: linkWhatsapp, rotulo: 'WhatsApp' },
  ]

  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__topo">
          <div>
            <div className="rodape__marca">
              <span className="marca__selo" aria-hidden="true">
                LH
              </span>
              <span>
                <strong>{config.nomeUrna}</strong>
                <em>
                  {config.cargo} · {config.numero} · {config.partido}
                </em>
              </span>
            </div>
            <p style={{ maxWidth: '38ch' }}>{config.slogan}</p>

            <div className="sociais">
              {sociais.map((rede) => (
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
          </div>

          <nav aria-label="Navegação do rodapé">
            <h4>Navegue</h4>
            <ul>
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.rotulo}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp da campanha
                </a>
              </li>
              <li>
                <a href={`mailto:${config.email}`}>{config.email}</a>
              </li>
              <li>
                <a href="#como-votar">Como votar {config.numero}</a>
              </li>
              <li>
                <a href="#privacidade">Política de Privacidade</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape__legal">
          <p className="selo-legal">
            <strong className="selo-legal__identificacao">
              {config.identificacaoLegal}
            </strong>
            <span>
              Propaganda eleitoral. Conteúdo de responsabilidade da candidata ao cargo
              de {config.cargo} por {config.estado}, número {config.numero}, pelo
              partido {config.partido}.
            </span>
          </p>

          <p>
            Site oficial de campanha, com endereço eletrônico comunicado à Justiça
            Eleitoral nos termos do art. 57-B, §1º, da Lei nº 9.504/1997. Este site não
            é custeado com recursos públicos e não veicula propaganda de pessoa
            jurídica. Todas as imagens são de uso autorizado pela campanha.
          </p>

          <details id="privacidade" style={{ marginTop: '6px' }}>
            <summary style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.86)' }}>
              Política de Privacidade e tratamento de dados (LGPD)
            </summary>
            <div style={{ marginTop: '12px', display: 'grid', gap: '10px' }}>
              <p>
                Os dados informados no formulário deste site (nome, telefone, cidade e
                mensagem) são coletados mediante consentimento e utilizados
                exclusivamente para o contato da campanha com o apoiador, durante o
                período eleitoral de {anoEleitoral}.
              </p>
              <p>
                Os dados não são comercializados nem compartilhados com terceiros para
                finalidade diversa. O titular pode solicitar, a qualquer momento, a
                confirmação, a correção ou a exclusão dos seus dados pelo e-mail{' '}
                <a href={`mailto:${config.email}`}>{config.email}</a>, conforme a Lei nº
                13.709/2018 (LGPD).
              </p>
              <p>
                Este site não utiliza cookies de rastreamento ou de publicidade
                comportamental.
              </p>
            </div>
          </details>

          <p style={{ marginTop: '6px' }}>
            © {anoEleitoral} {config.nomeUrna} · {config.cargo} {config.numero} ·{' '}
            {config.partido}/{config.uf}
          </p>
        </div>
      </div>
    </footer>
  )
}
