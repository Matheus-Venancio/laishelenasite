/* =========================================================
   CONTEÚDO DO SITE — edite aqui, não nos componentes.

   ⚠️ ITENS MARCADOS COM "PREENCHER" PRECISAM SER SUBSTITUÍDOS
   PELOS DADOS REAIS DA CAMPANHA ANTES DE PUBLICAR.
   ========================================================= */

export const config = {
  nomeUrna: 'Professora Laís Helena',
  nomeCompleto: 'Laís Helena Antonio dos Santos Aloise',
  numero: '2098',
  cargo: 'Deputada Federal',
  partido: 'PODEMOS',
  estado: 'São Paulo',
  uf: 'SP',
  slogan: 'Firme para defender, preparada para fazer.',
  site: 'https://www.professoralaishelena.com',

  // PREENCHER — contatos oficiais da campanha
  whatsapp: '5519999999999',
  email: 'contato@professoralaishelena.com',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',

  // CNPJ próprio da campanha (obrigatório na propaganda eleitoral)
  cnpjCampanha: '68.491.788/0001-10',
  // Linha de identificação exigida nas peças de propaganda eleitoral
  identificacaoLegal:
    'ELEIÇÃO 2026 | LAIS HELENA ANTONIO DOS SANTOS ALOISE | CNPJ: 68.491.788/0001-10',

  // PREENCHER — URL da vaquinha em plataforma de financiamento coletivo
  // previamente cadastrada e autorizada pela Justiça Eleitoral.
  // Deixe string vazia para esconder o bloco de doação do site.
  urlDoacao: '',
}

export const mensagemWhatsapp = encodeURIComponent(
  `Olá! Quero apoiar a campanha da ${config.nomeUrna}, ${config.numero}.`,
)

export const linkWhatsapp = `https://wa.me/${config.whatsapp}?text=${mensagemWhatsapp}`

export const linkCompartilhar = `https://api.whatsapp.com/send?text=${encodeURIComponent(
  `${config.nomeUrna} — ${config.cargo} ${config.numero}. ${config.slogan} Conheça a história dela: ${config.site}`,
)}`

export const navegacao = [
  { href: '#historia', rotulo: 'A história' },
  { href: '#trajetoria', rotulo: 'Trajetória' },
  { href: '#bandeiras', rotulo: 'Bandeiras' },
  { href: '#brasilia', rotulo: 'Em Brasília' },
  { href: '#regiao', rotulo: 'A região' },
  { href: '#livro', rotulo: 'O livro' },
  { href: '#moldura', rotulo: 'Moldura' },
  { href: '#participe', rotulo: 'Participe' },
]

export const credenciais = [
  { valor: '30+', texto: 'anos de vida pública dedicados à educação e à mulher' },
  { valor: '3', texto: 'mandatos como vereadora em Valinhos' },
  { valor: '1ª', texto: 'mulher negra eleita para o Legislativo de Valinhos' },
  { valor: '1ª', texto: 'mulher a ocupar a cadeira de prefeita da cidade' },
]

export const sobre = {
  paragrafos: [
    'Laís Helena nasceu no interior e cresceu numa família numerosa, com nove irmãos. Aprendeu cedo o que é trabalho, o que é falta e o que é solidariedade, e foi essa vida simples que moldou a forma como ela enxerga desigualdade até hoje.',
    'Antes de qualquer cargo público, ela foi professora. Deu aula, chamou pai e mãe para conversar, viu de perto o aluno que some da escola e o motivo pelo qual ele some. Essa experiência de sala de aula é a base de tudo o que defende: educação não é tema de discurso, é rotina que ela conhece por dentro.',
    'Da escola para a política, foram mais de trinta anos. Três mandatos como vereadora, a direção da Secretaria de Desenvolvimento Social e Habitação, a Secretaria de Esportes e Lazer, a vice-prefeita, e, prefeita de Valinhos. Em cada um desses lugares ela foi a primeira mulher a chegar.',
    'Fora dos cargos, a atuação seguiu a mesma linha: presidência do Lions Clube, voluntariado na FEAV e na Asserutil, conselheira da Santa Casa de Misericórdia de Valinhos. Sempre perto de quem precisa, sempre com o mesmo jeito direto de resolver.',
  ],
  citacao:
    'Eu não cheguei aqui para ocupar cadeira. Cheguei para transformar a realidade com experiência e dedicação.',
  autoria: 'Professora Laís Helena',
}

export const leis = [
  {
    titulo: 'Conselho Municipal dos Direitos da Mulher',
    detalhe: 'Lei nº 2.597/1993 — criou o CMDM de Valinhos, espaço permanente de defesa da mulher no município.',
  },
  {
    titulo: 'Semana da Mulher',
    detalhe: 'Instituiu no calendário oficial uma semana dedicada a debate, serviços e conscientização.',
  },
  {
    titulo: 'Dia da Consciência Negra em Valinhos',
    detalhe: 'Levou a data para o calendário do município, com programação educativa nas escolas.',
  },
  {
    titulo: 'Adote uma Nascente',
    detalhe: 'Programa de adoção e recuperação das nascentes urbanas de Valinhos.',
  },
  {
    titulo: 'Hino Nacional nas escolas',
    detalhe: 'Tornou obrigatória a execução do Hino Nacional na rede municipal de ensino.',
  },
]

export const trajetoria = [
  {
    ano: 'Origem',
    titulo: 'Professora antes de tudo',
    texto:
      'Formação e carreira em sala de aula, atuando diretamente com alunos antes de ocupar qualquer cargo público.',
  },
  {
    ano: '1993',
    titulo: 'Lei nº 2.597 — Conselho da Mulher',
    texto:
      'Autora da lei que criou o Conselho Municipal dos Direitos da Mulher (CMDM) de Valinhos.',
  },
  {
    ano: '3 mandatos',
    titulo: 'Vereadora de Valinhos',
    texto:
      'Atuação legislativa consistente ao longo de décadas, além de um período como suplente em exercício.',
  },
  {
    ano: '2005–2009',
    titulo: 'Desenvolvimento Social e Habitação',
    texto:
      'Diretora da Secretaria, à frente das políticas de assistência social e moradia do município.',
  },
  {
    ano: 'Executivo',
    titulo: 'Vice-prefeita de Valinhos',
    texto: 'Eleita vice-prefeita na gestão do ex-prefeito Orestes Previtale.',
  },
  {
    ano: 'Marco',
    titulo: 'Prefeita em exercício',
    texto:
      'Assumiu a Prefeitura por quinze dias — a primeira mulher da história de Valinhos a ocupar o cargo.',
  },
  {
    ano: 'Gestão',
    titulo: 'Secretária de Esportes e Lazer',
    texto:
      'Cerca de um ano de pasta, com reforma de campos e do ginásio e a realização do projeto Verão Valinhos.',
  },
  {
    ano: '2021',
    titulo: 'Presidência do diretório municipal',
    texto:
      'Assumiu a presidência do diretório do PSB em Valinhos, a convite do ex-prefeito de Campinas Jonas Donizete.',
  },
  {
    ano: '2022',
    titulo: 'Candidata a Deputada Estadual',
    texto: 'Disputou uma vaga na Assembleia Legislativa de São Paulo.',
  },
  {
    ano: '2026',
    titulo: '“Meu nome é Laís, Os tabus que derrubei”',
    texto:
      'Lançamento da biografia com os bastidores de mais de três décadas de vida pública.',
  },
  {
    ano: '2026',
    titulo: `Candidata a ${'Deputada Federal'} por ${'São Paulo'}`,
    texto:
      'Leva para Brasília a experiência de quem já geriu de perto educação, assistência social e proteção à mulher.',
  },
]

export const bandeiras = [
  {
    icone: 'escudo',
    titulo: 'Enfrentamento ao feminicídio',
    texto:
      'Fiscalização real da aplicação da Lei Maria da Penha e defesa de punição mais dura para quem descumpre medida protetiva. Proteção que funciona antes da tragédia, não depois.',
  },
  {
    icone: 'livro',
    titulo: 'Educação com quem viveu a sala de aula',
    texto:
      'Combate à evasão escolar, valorização de quem dá aula e ampliação do acesso de pessoas com autismo a uma educação de qualidade, com estrutura e apoio de verdade.',
  },
  {
    icone: 'familia',
    titulo: 'Segurança com foco na família',
    texto:
      'Segurança pública articulada com a proteção da infância e da adolescência: criança segura na rua, na escola e dentro de casa.',
  },
  {
    icone: 'maos',
    titulo: 'Assistência social e combate à desigualdade',
    texto:
      'A experiência de quem dirigiu a Secretaria de Desenvolvimento Social e Habitação, aplicada à política federal: recurso que chega em quem precisa.',
  },
  {
    icone: 'estrela',
    titulo: 'Representatividade que já é realidade',
    texto:
      'Mulher negra, professora e idosa, com décadas de gestão pública. Prova viva de que espaço de decisão também é lugar nosso.',
  },
  {
    icone: 'coracao',
    titulo: 'Saúde e cuidado com quem cuida',
    texto:
      'Mais recurso federal do SUS chegando de fato ao município, com atenção especial a professores, à enfermagem e aos agentes de saúde.',
  },
]

export const compromissos = [
  {
    titulo: 'Lei Maria da Penha fiscalizada de verdade',
    texto:
      'Acompanhar a aplicação da lei e defender pena mais dura para o descumprimento de medida protetiva.',
  },
  {
    titulo: 'Educação com financiamento garantido',
    texto:
      'Defender o fortalecimento dos fundos da educação e políticas nacionais de combate à evasão escolar.',
  },
  {
    titulo: 'Recurso do SUS chegando na ponta',
    texto:
      'Trabalhar para que o financiamento federal da saúde alcance as cidades da Região Metropolitana de Campinas.',
  },
  {
    titulo: 'Educação inclusiva para pessoas com autismo',
    texto:
      'Ampliar o acesso a uma educação de qualidade, com formação de professores e suporte nas escolas.',
  },
  {
    titulo: 'Combate à corrupção e eficiência no gasto público',
    texto:
      'Cobrar transparência e resultado na aplicação do dinheiro público, em todos os níveis.',
  },
  {
    titulo: 'Menos peso tributário sobre quem trabalha',
    texto:
      'Defender a redução da carga tributária que sufoca a família brasileira e o pequeno negócio.',
  },
  {
    titulo: 'Valorização de quem cuida',
    texto:
      'Reconhecimento e condições de trabalho para professores, enfermagem e agentes comunitários de saúde.',
  },
]

export const cidades = [
  'Valinhos',
  'Vinhedo',
  'Louveira',
  'Itatiba',
  'Campinas',
  'Toda a Região Metropolitana',
]

export const livro = {
  titulo: 'Meu nome é Laís',
  subtitulo: 'Os tabus que derrubei',
  ano: '2026',
  paragrafos: [
    'A biografia reúne a história pessoal e política de Laís Helena — da infância numa casa com nove irmãos aos bastidores de mais de trinta anos de vida pública.',
    'São histórias que nunca tinham sido contadas publicamente: as portas que se fecharam, as que ela abriu no empurrão e as que ficaram abertas para as mulheres que vieram depois.',
  ],
}

/**
 * Monta o srcSet a partir das larguras geradas pelo tratamento das fotos.
 * A maior largura é salva sem sufixo (ex.: lais-cidade.webp).
 */
const srcSet = (base, larguras) =>
  larguras
    .map((l, i) => `${base}${i === larguras.length - 1 ? '' : `-${l}`}.webp ${l}w`)
    .join(', ')

export const galeria = [
  {
    id: 'conversando',
    src: '/fotos/lais-conversando-800.webp',
    srcSet: srcSet('/fotos/lais-conversando', [800, 1200, 1800]),
    classe: 'g-larga',
    alt: 'Laís Helena conversando com duas moradoras na calçada, durante visita de rua.',
    legenda: 'Rua por rua, ouvindo quem vive o problema',
  },
  {
    id: 'cidade',
    src: '/fotos/lais-cidade-800.webp',
    srcSet: srcSet('/fotos/lais-cidade', [800, 1200, 1800]),
    classe: '',
    alt: 'Laís Helena sorrindo em frente ao letreiro “Eu amo Valinhos”, no parque da cidade.',
    legenda: 'Valinhos, a cidade onde tudo começou',
  },
  {
    id: 'regiao',
    src: '/fotos/lais-regiao-800.webp',
    srcSet: srcSet('/fotos/lais-regiao', [800, 1200, 1800]),
    classe: 'g-larga',
    alt: 'Laís Helena de corpo inteiro em frente ao letreiro “Eu amo Valinhos”.',
    legenda: 'Raiz na cidade, trabalho em toda a região',
  },
  {
    id: 'retrato',
    src: '/fotos/lais-retrato-560.webp',
    srcSet: srcSet('/fotos/lais-retrato', [560, 800, 1200]),
    classe: '',
    alt: 'Retrato sorridente da professora Laís Helena.',
    legenda: 'Professora Laís Helena',
  },
]

export const passosVoto = [
  'Na urna, digite o número 2098.',
  'Confira na tela o nome Professora Laís Helena e a foto dela.',
  'Aperte CONFIRMA. Pronto — voto registrado.',
]
