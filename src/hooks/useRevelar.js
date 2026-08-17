import { useEffect } from 'react'

/**
 * Revela os elementos com a classe .revelar conforme entram na viewport.
 * Se o usuário pediu menos animação, tudo já nasce visível (ver index.css).
 */
export default function useRevelar() {
  useEffect(() => {
    const alvos = document.querySelectorAll('.revelar')
    if (!('IntersectionObserver' in window)) {
      alvos.forEach((el) => el.classList.add('visivel'))
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel')
            observador.unobserve(entrada.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    alvos.forEach((el) => observador.observe(el))

    // Rede de segurança: se o observador não disparar (aba sem composição,
    // extensão bloqueando, navegador antigo), o conteúdo aparece do mesmo
    // jeito. Conteúdo escondido é pior que animação perdida.
    let socorro
    const armarSocorro = () => {
      clearTimeout(socorro)
      // em aba de fundo o IntersectionObserver não roda: espera voltar ao foco
      if (document.visibilityState !== 'visible') return
      socorro = setTimeout(() => {
        if (!document.querySelector('.revelar.visivel')) {
          observador.disconnect()
          alvos.forEach((el) => el.classList.add('visivel'))
        }
      }, 2500)
    }

    armarSocorro()
    document.addEventListener('visibilitychange', armarSocorro)

    return () => {
      clearTimeout(socorro)
      document.removeEventListener('visibilitychange', armarSocorro)
      observador.disconnect()
    }
  }, [])
}
