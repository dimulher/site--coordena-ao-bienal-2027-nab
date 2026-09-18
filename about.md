# Landing — Escritor de Alto Nível (NAB)

- **Produto:** Oferta de entrada NAB — **"Escritor de Alto Nível"** (renomeado de "Autoridade em Páginas" em 29/05) — Treinamento em vídeo + Guia do Autor de bônus
- **Preço:** R$47 lançamento / R$67 normal
- **Status:** 🟢 Pronta — falta só Pixel + checkout Cakto
- **Stack:** HTML único, mobile-first, sem build step
- **Branding:** NAB claro/editorial — marfim `#FAF6EE`, navy `#0E1A32`, bordô `#B44B3B`, dourado `#CBA135` · Playfair Display + Montserrat (TRAVADO — não mexer)
- **Funil:** Anúncio Meta → LP → botão de compra → checkout Cakto (venda direta, sem captura de lead)

## Estrutura da página
Header (logo bordô) → Hero enxuto → Manifesto → O que recebe (treinamento principal + Guia de bônus) → Editora + parceiros (Pablo Marçal, Cristiane Arcangeli, Carlos Wizard, Ivan Misner) → Ticker animado (faixa navy) → Histórias reais (carrossel de foco Gala + Bienal) → Pra quem é → Oferta → FAQ → Footer. Divisores ✦ entre blocos.

## Decisões de copy (travadas)
- Nunca dizer "mini curso" nem quantidade de aulas → usar **"treinamento em vídeo"**
- Não usar a palavra "PDF" (genérico) → "O Guia do Autor de Alto Nível"
- Guia = **bônus**; treinamento = produto principal
- Sem foco no Jorge — prova social = editora + coautores
- Não afirmar que foto é da Bienal sem certeza; usar provas reais (500+ autores, 4 anos, Bienal 700 mil)

## Animações
- **Ticker** contínuo na faixa navy (números/frases passando) — anima mesmo com prefers-reduced-motion
- **Carrossel de foco central** (recriação vanilla do Skiper54/embla): foto central expande via clip-path, laterais comprimidas, autoplay + setas + dots + loop por clones. Gala (paisagem 3:2) e Bienal (retrato) separados
- Light sweep dourado no card do Guia · Fade-up on scroll (progressive enhancement: conteúdo visível sem JS)
> Versões pesadas (GSAP/Three.js/jQuery/React) recriadas em CSS/JS puro por performance.

## Fotos (assets/)
- `gala-1..8.jpg` (paisagem) · `bienal-1..8.jpg` (retrato) — vindas do álbum Imgur, classificadas e otimizadas
- `parceiro-*.jpg` (4 parceiros) · `logo-h-bordo.png` / `logo-v-bordo.png`
- Backup das 33 originais em `assets/orig/` (excluído do deploy via .vercelignore)

## Box de oferta
- Card **"certificado marfim"** (fundo marfim + moldura dourada interna estilo diploma, filete dourado no título, botão bordô, selo de garantia dourado pontilhado) — aprovado 29/05 no lugar do antigo box navy
- Mobile: oferta consolidada nesse card único (lista + preço + escassez + botão + garantia) — sem preço duplicado; JS move os blocos conforme largura
- Carrossel Bienal em quadro retrato; Gala em paisagem (só desktop ajustado p/ não cortar)

## Pendências para publicar
- [ ] Colar **Meta Pixel ID** (bloco comentado no `<head>`)
- [x] Checkout Cakto (link de TESTE: https://pay.cakto.com.br/gicotmg_891482) — trocar pelo definitivo na hora de rodar
- [x] Fotos, logos e parceiros em `/assets`
- [ ] Configurar evento **Purchase** no painel da Cakto (pixel + CAPI)
- [x] Deploy no Vercel

## URLs
- Site NAB oficial: www.novosautoresdobrasil.com.br
- **Deploy Vercel (produção):** https://site-drab-ten-79.vercel.app
  - Projeto Vercel: `dedes-projects-9e37dbea/site` · conta `dedeontonio20-5466`
  - Redeploy: `vercel deploy "<pasta site>" --prod --yes` (pasta já linkada via `.vercel/`)
  - Subiu em 29/05/2026. Próximo passo: colar Pixel + Cakto e fazer redeploy.
