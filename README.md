# Site de campanha — Professora Laís Helena · Deputada Federal 2098

Landing page em **React + Vite**, pronta para publicar na **Vercel**.

**Slogan:** Firme para defender, preparada para fazer.
**Cores:** `#e6076c` (principal) · `#ff47c6` · `#f7cf0d` · `#ffffff`

---

## ⚠️ Antes de publicar — 6 itens obrigatórios

Estes itens estão marcados com `PREENCHER` em `src/dados/conteudo.js`:

| # | Item | Onde |
|---|------|------|
| 1 | **WhatsApp oficial** (formato `5519999999999`) | `config.whatsapp` |
| 2 | **E-mail de contato** | `config.email` |
| 3 | **Instagram / Facebook / YouTube** | `config.instagram`, `.facebook`, `.youtube` |
| 4 | **Link da vaquinha** (só se houver financiamento coletivo autorizado) | `config.urlDoacao` |
| 5 | **Domínio real** | `config.site`, `index.html` (canonical + og:url), `public/sitemap.xml`, `public/robots.txt` |

✅ CNPJ da campanha já preenchido: `68.491.788/0001-10` (`config.cnpjCampanha` e `config.identificacaoLegal`).

> Enquanto `config.urlDoacao` estiver vazio, o bloco de doação simplesmente não aparece no site.

---

## Conformidade eleitoral (Eleições 2026)

O que **já está no site**:

- Identificação completa no rodapé: nome completo, cargo, número, partido, CNPJ da campanha e ano da eleição.
- Aviso de que o site **não é custeado com recursos públicos** e não veicula propaganda de pessoa jurídica.
- Menção ao art. 57-B, §1º da Lei nº 9.504/1997 (endereço eletrônico comunicado à Justiça Eleitoral).
- Texto legal do bloco de doação (pessoa física, limite de 10% dos rendimentos brutos do ano anterior — art. 23 da Lei nº 9.504/1997), exibido apenas quando há link de doação.
- Política de Privacidade e caixa de consentimento no formulário (LGPD — Lei nº 13.709/2018).
- Conteúdo propositivo, sem citação, comparação ou ataque a adversários.
- Sem divulgação de pesquisa eleitoral.

O que **depende de ação da campanha** (o site não resolve sozinho):

1. **Comunicar o endereço eletrônico à Justiça Eleitoral.** O rodapé afirma que isso foi feito — faça antes de publicar, ou remova a frase.
2. **Hospedagem em provedor estabelecido no País.** O art. 57-B, §1º exige provedor no Brasil. A **Vercel é empresa estrangeira**. Alternativas: contratar hospedagem nacional (Locaweb, UOL Host, HostGator BR, KingHost) ou registrar um domínio `.com.br` no Registro.br apontando para um provedor nacional. Se a decisão for manter a Vercel, faça isso com ciência do risco e, de preferência, com aval do advogado eleitoral da campanha.
3. **Autorização de uso de imagem** das duas eleitoras que aparecem na foto “conversando”. São pessoas identificáveis — é preciso autorização por escrito.
4. **Período de propaganda.** Pedido expresso de voto é permitido a partir de 16 de agosto do ano eleitoral. O site já está com pedido de voto ativo.
5. **Revisão pelo advogado eleitoral** antes de ir ao ar.

---

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:5174`.

```bash
npm run build
```

Gera a pasta `dist/`.

---

## Publicando na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project → Import** do repositório.
3. A Vercel detecta o Vite sozinho. Se pedir, confirme:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy.**
5. Em **Settings → Domains**, aponte o domínio da campanha.

O arquivo `vercel.json` já traz cache longo para `/fotos` e cabeçalhos básicos de segurança.

---

## Estrutura

```
sitelais/
├── ferramentas/
│   └── tratar-fotos.py        # chroma key + recorte + WebP + imagem de compartilhamento
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── fotos/                 # fotos já tratadas (WebP + PNG transparente)
├── src/
│   ├── dados/conteudo.js      # ⭐ TODO O TEXTO DO SITE ESTÁ AQUI
│   ├── componentes/           # uma seção por arquivo
│   ├── hooks/useRevelar.js
│   ├── index.css              # design system (cores, tipografia, responsivo)
│   ├── App.jsx
│   └── main.jsx
├── index.html                 # SEO, Open Graph, dados estruturados
└── vercel.json
```

### Seções, na ordem

Hero → Credenciais → A história + Leis → Trajetória → Bandeiras → Em Brasília → A região → O livro → Galeria → Pedido de voto → Como votar → Participe → Rodapé.

---

## Editando o conteúdo

Praticamente tudo é editável em **`src/dados/conteudo.js`**, sem tocar em componente:
textos das bandeiras, compromissos, linha do tempo, leis, cidades, legendas da galeria,
passos da votação e itens do menu.

Removeu ou trocou uma bandeira? A grade se reorganiza sozinha.

---

## Fotos

As fotos originais foram tratadas por `ferramentas/tratar-fotos.py`:

- **Fundo verde removido** (chroma key com supressão de spill) nas fotos `FOTO PRIINCIPAL` e `BRACO FELIZ` → PNG transparente + WebP com transparência.
- Orientação corrigida, recorte no contorno da candidata.
- Versões responsivas em WebP (o WebP transparente pesa ~10× menos que o PNG; o PNG fica só como fallback).
- `og-lais-helena.jpg` (1200×630) para pré-visualização no WhatsApp, Facebook e X.

Para reprocessar depois de trocar as fotos originais:

```bash
python ferramentas/tratar-fotos.py
```

Requer `pillow`, `numpy` e `scipy`. Ajuste o caminho `SRC` no topo do arquivo.

---

## Acessibilidade

- HTML semântico, link “pular para o conteúdo”, foco visível em amarelo.
- `alt` descritivo em todas as fotos.
- Menu móvel com `aria-expanded` / `aria-controls`.
- Contraste conferido (mínimo 4.5:1 em texto normal).
- Respeita `prefers-reduced-motion`.
- Se o JavaScript falhar, o conteúdo aparece mesmo assim.
