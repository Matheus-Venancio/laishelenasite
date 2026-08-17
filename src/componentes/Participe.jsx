import { useState } from 'react'
import { config, linkWhatsapp, linkCompartilhar } from '../dados/conteudo'
import Icone from './Icones'

const formasDeAjudar = [
  'Divulgar entre amigos e familiares',
  'Ser voluntário(a) na minha rua ou bairro',
  'Ceder espaço para uma conversa/reunião',
  'Levar a candidata até um grupo ou entidade',
  'Só quero receber notícias da campanha',
]

export default function Participe() {
  const [dados, setDados] = useState({
    nome: '',
    telefone: '',
    cidade: '',
    forma: formasDeAjudar[0],
    mensagem: '',
    consentimento: false,
  })

  const alterar = (campo) => (evento) => {
    const valor =
      evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const texto = [
      `Olá! Quero apoiar a campanha da ${config.nomeUrna}, ${config.numero}.`,
      '',
      `Nome: ${dados.nome}`,
      `Telefone: ${dados.telefone}`,
      `Cidade: ${dados.cidade}`,
      `Como posso ajudar: ${dados.forma}`,
      dados.mensagem ? `Mensagem: ${dados.mensagem}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const acoes = [
    {
      icone: 'whatsapp',
      titulo: 'Falar direto com a campanha',
      texto: 'Dúvida, sugestão ou convite para uma visita no seu bairro.',
      href: linkWhatsapp,
    },
    {
      icone: 'compartilhar',
      titulo: 'Compartilhar com quem você conhece',
      texto: 'A maior estrutura desta campanha é o boca a boca. Envie para o seu grupo.',
      href: linkCompartilhar,
    },
    {
      icone: 'megafone',
      titulo: 'Ser voluntário(a) na sua rua',
      texto: 'Poucas pessoas em cada bairro já mudam o resultado de uma eleição.',
      href: '#formulario-apoio',
    },
    config.urlDoacao
      ? {
          icone: 'coracao',
          titulo: 'Doar para a campanha',
          texto:
            'Doação de pessoa física, pela plataforma oficial de financiamento coletivo.',
          href: config.urlDoacao,
        }
      : null,
  ].filter(Boolean)

  return (
    <section className="secao secao--creme" id="participe">
      <div className="container">
        <div className="cabecalho-secao revelar">
          <p className="olho">Participe</p>
          <h2 className="titulo-secao">
            Esta campanha não tem grande estrutura. Tem <span className="grifo">gente</span>.
          </h2>
          <p className="chamada">
            Nada de máquina, nada de padrinho. O que sustenta esta candidatura é a
            história de Laís Helena e o apoio direto de quem acredita nela. Escolha
            abaixo como você quer somar.
          </p>
        </div>

        <div className="participe__grade">
          <div className="revelar">
            <div className="acoes-apoio">
              {acoes.map((acao) => (
                <a
                  className="acao-apoio"
                  key={acao.titulo}
                  href={acao.href}
                  {...(acao.href.startsWith('#')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="acao-apoio__icone" aria-hidden="true">
                    <Icone nome={acao.icone} />
                  </span>
                  <span>
                    <b>{acao.titulo}</b>
                    <span>{acao.texto}</span>
                  </span>
                </a>
              ))}
            </div>

            {config.urlDoacao ? (
              <p className="form-nota" style={{ textAlign: 'left', marginTop: '18px' }}>
                Doações somente de pessoas físicas, limitadas a 10% dos rendimentos
                brutos declarados no ano anterior, conforme a Lei nº 9.504/1997. Toda
                doação é registrada e prestada contas à Justiça Eleitoral.
              </p>
            ) : null}
          </div>

          <form className="formulario revelar" id="formulario-apoio" onSubmit={enviar}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>
              Quero somar com a campanha
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--tinta-media)', marginBottom: '22px' }}>
              Preencha e envie — a mensagem abre direto no WhatsApp da campanha.
            </p>

            <div className="campo">
              <label htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                value={dados.nome}
                onChange={alterar('nome')}
                placeholder="Como você quer ser chamado(a)"
              />
            </div>

            <div className="campo campo--duplo">
              <div>
                <label htmlFor="telefone">WhatsApp</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={dados.telefone}
                  onChange={alterar('telefone')}
                  placeholder="(19) 9 0000-0000"
                />
              </div>
              <div>
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  name="cidade"
                  type="text"
                  required
                  value={dados.cidade}
                  onChange={alterar('cidade')}
                  placeholder="Valinhos"
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="forma">Como você quer ajudar</label>
              <select id="forma" name="forma" value={dados.forma} onChange={alterar('forma')}>
                {formasDeAjudar.map((forma) => (
                  <option key={forma} value={forma}>
                    {forma}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="mensagem">Mensagem (opcional)</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={dados.mensagem}
                onChange={alterar('mensagem')}
                placeholder="Conte o que está faltando no seu bairro."
              />
            </div>

            <label className="consentimento" htmlFor="consentimento">
              <input
                id="consentimento"
                name="consentimento"
                type="checkbox"
                required
                checked={dados.consentimento}
                onChange={alterar('consentimento')}
              />
              <span>
                Autorizo o contato da campanha pelos dados informados e concordo com a{' '}
                <a href="#privacidade" style={{ color: 'var(--rosa)', fontWeight: 600 }}>
                  Política de Privacidade
                </a>
                , nos termos da LGPD (Lei nº 13.709/2018).
              </span>
            </label>

            <button type="submit" className="btn btn--primario btn--bloco">
              Enviar pelo WhatsApp
              <Icone nome="seta" style={{ width: 19, height: 19 }} />
            </button>

            <p className="form-nota">
              Seus dados são usados apenas para o contato da campanha e não são vendidos
              nem repassados a terceiros.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
