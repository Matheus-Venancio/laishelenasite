const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

const traçados = {
  escudo: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6l-7-3Z" />
      <path d="M12 9.2v3.2M12 15.4h.01" />
    </>
  ),
  livro: (
    <>
      <path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H19v15H6.2A2.2 2.2 0 0 0 4 20.2V5.2Z" />
      <path d="M19 18v3H6.2A2.2 2.2 0 0 1 4 18.8M8.5 7.5h6M8.5 11h4" />
    </>
  ),
  familia: (
    <>
      <circle cx="8" cy="7" r="2.6" />
      <circle cx="16.5" cy="8.5" r="2.1" />
      <path d="M3 20v-1.6A4.4 4.4 0 0 1 7.4 14h1.2A4.4 4.4 0 0 1 13 18.4V20" />
      <path d="M14.6 20v-1.4a3.6 3.6 0 0 1 3.6-3.6H19a2 2 0 0 1 2 2V20" />
    </>
  ),
  maos: (
    <>
      <path d="M12 20.5S4.5 16.2 4.5 10.8a3.8 3.8 0 0 1 7.5-1 3.8 3.8 0 0 1 7.5 1c0 5.4-7.5 9.7-7.5 9.7Z" />
    </>
  ),
  estrela: (
    <>
      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </>
  ),
  coracao: (
    <>
      <path d="M20.5 8.6a4.3 4.3 0 0 0-7.6-2.7l-.9 1-.9-1A4.3 4.3 0 0 0 3.5 8.6c0 4.6 8.5 10 8.5 10s8.5-5.4 8.5-10Z" />
      <path d="M8.5 12h2l1-1.8 1.4 3 1-1.2h2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.6a7.8 7.8 0 1 1 2.9 2.8l-4.4 1.1Z" />
      <path d="M9 9.4c.2 1.1.8 2.2 1.7 3 .9.9 2 1.5 3.1 1.7l.9-1.2 1.9.9-.4 1.5c-1.9.4-4-.5-5.6-2.1-1.6-1.6-2.4-3.7-2-5.6l1.5-.4.9 1.9L9 9.4Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M17 7h.01" />
    </>
  ),
  facebook: (
    <>
      <path d="M14.5 21v-7.5h2.6l.5-3.1h-3.1V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.1A21 21 0 0 0 15.3 4c-2.4 0-4 1.4-4 4.1v2.3H8.6v3.1h2.7V21" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4" />
      <path d="m10.3 9.4 4.6 2.6-4.6 2.6V9.4Z" />
    </>
  ),
  megafone: (
    <>
      <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5h1.9L14 20V4L7.4 8.5H5.5A1.5 1.5 0 0 0 4 10Z" />
      <path d="M17.4 9.2a4 4 0 0 1 0 5.6M19.8 6.8a7.5 7.5 0 0 1 0 10.4" />
      <path d="M7.4 15.5V20" />
    </>
  ),
  compartilhar: (
    <>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.5 7.1 4.7a1.6 1.6 0 0 0 1.8 0L20 7.5" />
    </>
  ),
  seta: (
    <>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.4a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
}

export default function Icone({ nome, ...resto }) {
  const conteudo = traçados[nome]
  if (!conteudo) return null
  return (
    <svg {...base} {...resto}>
      {conteudo}
    </svg>
  )
}
