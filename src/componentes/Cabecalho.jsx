import { useEffect, useState } from 'react'
import { config, navegacao, linkWhatsapp } from '../dados/conteudo'

export default function Cabecalho() {
  const [fixo, setFixo] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const aoRolar = () => setFixo(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    const aoRedimensionar = () => {
      if (window.innerWidth > 1080) setAberto(false)
    }
    window.addEventListener('resize', aoRedimensionar)
    return () => window.removeEventListener('resize', aoRedimensionar)
  }, [])

  return (
    <header className={`cabecalho${fixo ? ' cabecalho--fixo' : ''}`}>
      <div className="container cabecalho__interno">
        <a className="marca" href="#topo" aria-label={`${config.nomeUrna}, início`}>
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

        <nav className="nav" aria-label="Navegação principal">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href}>
              {item.rotulo}
            </a>
          ))}
        </nav>

        <div className="cabecalho__acoes">
          <a
            className="btn btn--primario"
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com a campanha
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div
        id="menu-movel"
        className={`menu-movel${aberto ? ' menu-movel--aberto' : ''}`}
        hidden={!aberto}
      >
        <nav aria-label="Navegação principal (celular)">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setAberto(false)}>
              {item.rotulo}
            </a>
          ))}
        </nav>
        <a
          className="btn btn--primario btn--bloco"
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setAberto(false)}
        >
          Falar com a campanha
        </a>
      </div>
    </header>
  )
}
