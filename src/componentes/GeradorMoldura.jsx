import { useCallback, useEffect, useRef, useState } from 'react'
import { config } from '../dados/conteudo'

// ============================================================
//  GERADOR DE MOLDURA DE APOIADOR
//  A montagem acontece 100% no aparelho do visitante: a foto
//  nunca sai do navegador, não há upload nem servidor envolvido.
// ============================================================

const FORMATOS = [
  { chave: 'post', rotulo: 'Post (quadrado)', w: 1080, h: 1080 },
  { chave: 'story', rotulo: 'Story (vertical)', w: 1080, h: 1920 },
]

// Para adicionar um modelo: gere a arte com ferramentas/preparar-molduras.py
// e acrescente uma linha aqui. Nenhuma outra mudança é necessária.
const MODELOS = [
  { chave: 'estoucom', rotulo: 'ESTOU COM A LAÍS' },
  { chave: 'euvoto', rotulo: 'EU VOTO' },
  { chave: 'classico', rotulo: 'Clássico' },
]

const ROSA = '#e6076c'
const ROSA_PROFUNDO = '#7d0339'
const AMARELO = '#f7cf0d'

const IconeFoto = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.9" />
    <path d="M8.5 6l1.2-2h4.6L15.5 6" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
  </svg>
)

const IconeBaixar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const IconeCompartilhar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="18" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="18" cy="19" r="2.6" stroke="currentColor" strokeWidth="1.9" />
    <path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
)

/**
 * Faixa de emergência: só entra em cena se o PNG oficial não carregar,
 * para o material nunca sair sem a identificação da campanha.
 */
function faixaDeEmergencia(ctx, w, h) {
  const banda = Math.round(h * (h > w ? 0.16 : 0.23))
  const baseY = h - banda

  const sombra = ctx.createLinearGradient(0, baseY - h * 0.08, 0, baseY)
  sombra.addColorStop(0, 'rgba(0,0,0,0)')
  sombra.addColorStop(1, 'rgba(0,0,0,0.3)')
  ctx.fillStyle = sombra
  ctx.fillRect(0, baseY - h * 0.08, w, h * 0.08)

  const g = ctx.createLinearGradient(0, baseY, w, h)
  g.addColorStop(0, ROSA_PROFUNDO)
  g.addColorStop(1, ROSA)
  ctx.fillStyle = g
  ctx.fillRect(0, baseY, w, banda)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#ffffff'
  ctx.font = '800 ' + Math.round(banda * 0.2) + 'px Archivo, system-ui, sans-serif'
  ctx.fillText(config.nomeUrna.toUpperCase(), w / 2, baseY + banda * 0.36)

  ctx.fillStyle = AMARELO
  ctx.font = '900 ' + Math.round(banda * 0.42) + 'px Archivo, system-ui, sans-serif'
  ctx.fillText(config.numero, w / 2, baseY + banda * 0.78)
}

export default function GeradorMoldura() {
  const canvasRef = useRef(null)
  const arrastando = useRef(false)
  const ultimoPonto = useRef({ x: 0, y: 0 })
  const urlTemporaria = useRef(null)

  const [imagem, setImagem] = useState(null)
  const [arte, setArte] = useState(null)
  const [modelo, setModelo] = useState(MODELOS[0].chave)
  const [formato, setFormato] = useState(FORMATOS[0].chave)
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')

  const dim = FORMATOS.find((f) => f.chave === formato)

  // Carrega a arte oficial do modelo/formato escolhido
  useEffect(() => {
    let valido = true
    const im = new Image()
    im.onload = () => valido && setArte(im)
    im.onerror = () => valido && setArte(null)
    im.src = `/moldura/${modelo}-${formato}.png`
    return () => {
      valido = false
    }
  }, [modelo, formato])

  const desenhar = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { w, h } = dim
    canvas.width = w
    canvas.height = h

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    if (imagem) {
      // "cover": a foto sempre preenche a arte inteira
      const base = Math.max(w / imagem.width, h / imagem.height)
      const escala = base * zoom
      const dw = imagem.width * escala
      const dh = imagem.height * escala
      const maxX = Math.max(0, (dw - w) / 2)
      const maxY = Math.max(0, (dh - h) / 2)
      const x = Math.min(maxX, Math.max(-maxX, pos.x))
      const y = Math.min(maxY, Math.max(-maxY, pos.y))
      ctx.drawImage(imagem, (w - dw) / 2 + x, (h - dh) / 2 + y, dw, dh)
    } else {
      ctx.fillStyle = '#fdeef6'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(125, 3, 57, 0.42)'
      ctx.textAlign = 'center'
      ctx.font = '600 ' + Math.round(w * 0.04) + 'px Inter, system-ui, sans-serif'
      ctx.fillText('Escolha a sua foto', w / 2, h * 0.3)
    }

    // A arte é um ativo pronto: nunca reproduzir a identidade por código.
    if (arte) ctx.drawImage(arte, 0, 0, w, h)
    else faixaDeEmergencia(ctx, w, h)
  }, [imagem, arte, zoom, pos, dim])

  // Espera as fontes carregarem, senão a faixa de emergência sai com a fonte errada
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(desenhar).catch(desenhar)
    } else {
      desenhar()
    }
  }, [desenhar])

  useEffect(
    () => () => {
      if (urlTemporaria.current) URL.revokeObjectURL(urlTemporaria.current)
    },
    [],
  )

  const escolherFoto = async (evento) => {
    const arquivo = evento.target.files && evento.target.files[0]
    if (!arquivo) return
    setOcupado(true)
    setErro('')
    try {
      let bitmap
      if ('createImageBitmap' in window) {
        // from-image respeita a orientação EXIF: foto de celular não sai deitada
        bitmap = await createImageBitmap(arquivo, { imageOrientation: 'from-image' })
      } else {
        if (urlTemporaria.current) URL.revokeObjectURL(urlTemporaria.current)
        urlTemporaria.current = URL.createObjectURL(arquivo)
        bitmap = await new Promise((ok, falha) => {
          const img = new Image()
          img.onload = () => ok(img)
          img.onerror = falha
          img.src = urlTemporaria.current
        })
      }
      setImagem(bitmap)
      setZoom(1)
      setPos({ x: 0, y: 0 })
    } catch {
      setErro('Não foi possível abrir essa imagem. Tente outra foto.')
    } finally {
      setOcupado(false)
      evento.target.value = ''
    }
  }

  const pontoDoEvento = (evento) => {
    const area = canvasRef.current.getBoundingClientRect()
    const escala = dim.w / area.width
    return { x: evento.clientX * escala, y: evento.clientY * escala }
  }

  const aoPressionar = (evento) => {
    if (!imagem) return
    arrastando.current = true
    ultimoPonto.current = pontoDoEvento(evento)
    evento.currentTarget.setPointerCapture(evento.pointerId)
  }

  const aoMover = (evento) => {
    if (!arrastando.current) return
    const p = pontoDoEvento(evento)
    const dx = p.x - ultimoPonto.current.x
    const dy = p.y - ultimoPonto.current.y
    ultimoPonto.current = p
    setPos((v) => ({ x: v.x + dx, y: v.y + dy }))
  }

  const aoSoltar = (evento) => {
    arrastando.current = false
    try {
      evento.currentTarget.releasePointerCapture(evento.pointerId)
    } catch {
      /* ponteiro já liberado */
    }
  }

  const gerarBlob = () =>
    new Promise((ok) => canvasRef.current.toBlob(ok, 'image/png'))

  const nomeArquivo = `apoio-lais-helena-${config.numero}.png`

  const baixar = async () => {
    const blob = await gerarBlob()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nomeArquivo
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  const compartilhar = async () => {
    const blob = await gerarBlob()
    if (!blob) return
    const arquivo = new File([blob], nomeArquivo, { type: 'image/png' })
    if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
      try {
        await navigator.share({
          files: [arquivo],
          title: `${config.nomeUrna} ${config.numero}`,
          text: `Estou com a ${config.nomeUrna} — ${config.cargo} ${config.numero}. ${config.slogan}`,
        })
      } catch {
        /* o visitante cancelou: não é erro */
      }
      return
    }
    // Desktop e navegadores sem Web Share: cai para o download
    baixar()
  }

  return (
    <div className="gerador">
      <div className="gerador__previa">
        <canvas
          ref={canvasRef}
          className={`gerador__tela${imagem ? ' gerador__tela--arrastavel' : ''}`}
          style={{ aspectRatio: `${dim.w} / ${dim.h}` }}
          onPointerDown={aoPressionar}
          onPointerMove={aoMover}
          onPointerUp={aoSoltar}
          onPointerCancel={aoSoltar}
          role="img"
          aria-label={`Prévia da moldura ${modelo} no formato ${formato}`}
        />
        {imagem && <p className="gerador__dica">Arraste a foto para ajustar</p>}
      </div>

      <div className="gerador__controles">
        <div className="gerador__campo">
          <span className="gerador__rotulo">1. Escolha o modelo</span>
          <div className="gerador__opcoes" role="group" aria-label="Modelo da moldura">
            {MODELOS.map((m) => (
              <button
                key={m.chave}
                type="button"
                className={`gerador__chip${modelo === m.chave ? ' gerador__chip--ativo' : ''}`}
                aria-pressed={modelo === m.chave}
                onClick={() => setModelo(m.chave)}
              >
                {m.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="gerador__campo">
          <span className="gerador__rotulo">2. Escolha o formato</span>
          <div className="gerador__opcoes" role="group" aria-label="Formato da imagem">
            {FORMATOS.map((f) => (
              <button
                key={f.chave}
                type="button"
                className={`gerador__chip${formato === f.chave ? ' gerador__chip--ativo' : ''}`}
                aria-pressed={formato === f.chave}
                onClick={() => setFormato(f.chave)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="gerador__campo">
          <span className="gerador__rotulo">3. Coloque a sua foto</span>
          <label className="btn btn--primario btn--bloco gerador__escolher">
            <IconeFoto />
            {imagem ? 'Trocar foto' : 'Escolher foto'}
            {/* sem o atributo capture: abre a galeria, não força a câmera */}
            <input type="file" accept="image/*" onChange={escolherFoto} hidden />
          </label>
        </div>

        {erro && (
          <p className="gerador__erro" role="alert">
            {erro}
          </p>
        )}

        {imagem && (
          <label className="gerador__zoom">
            Zoom
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </label>
        )}

        <div className="gerador__acoes">
          <button
            type="button"
            className="btn btn--primario"
            onClick={baixar}
            disabled={!imagem || ocupado}
          >
            <IconeBaixar /> Baixar imagem
          </button>
          <button
            type="button"
            className="btn btn--contorno"
            onClick={compartilhar}
            disabled={!imagem || ocupado}
          >
            <IconeCompartilhar /> Publicar
          </button>
        </div>

        <p className="gerador__nota">
          A sua foto não é enviada nem armazenada em nenhum servidor. A imagem é
          montada dentro do seu próprio aparelho e salva direto na sua galeria.
        </p>
      </div>
    </div>
  )
}
