# design.md — Seleção de Coordenadores NAB (v2)

> LP de seleção de Coordenadores NAB (jornada: capa de livro, produção de imagem, palco na Bienal do Rio 2027, evento internacional).
> Duplicado de `site-stand-bienal-nab` (mesmo layout/tema visual), com a copy trocada pela do funil `site-selecao-coordenadores`. Rascunho interno — não publicado, não substitui a campanha ativa em `novosautoresdobrasil.netlify.app` até aprovação do Dede.

## 1. Identidade & Tom
- **Projeto:** Landing de seleção de Coordenadores (NAB)
- **Setor:** Editora — recrutamento/aplicação, não venda direta
- **Sensação visual:** editorial premium, claro, sofisticado (mesmo padrão NAB)

## 2. Cores
| Papel | Hex | Uso |
|-------|-----|-----|
| Marfim (base) | `#FAF6EE` | fundo principal |
| Marfim 2 | `#FBF5E9` / `#F2EAD9` | seções alternadas |
| Branco | `#FFFFFF` | cards |
| Dourado | `#E6D29A` / `#E3C56B` | destaques premium |
| Bordô | `#B44B3B` | CTA / ênfase |
| Navy | `#0E1A32` | blocos escuros (combo, ticker) |

## 3. Tipografia
- **Títulos:** Playfair Display — 400/600/700/800/900 (+ itálico 500)
- **Corpo:** Montserrat — 300/400/500/600/700

## 4. Estrutura da página
1. Header fixo (logo + CTA "Quero fazer parte")
2. Hero + proof bar (500+ autores / 700 mil pessoas na Bienal / 2 palcos Brasil+Internacional)
3. Manifesto — Capítulo 01: "Você é bom no que faz. O mercado ainda não sabe disso."
4. Jornada do Coordenador — Capítulo 02: 3 cards (Identidade, Imagem, Presença) + bloco de destaque (Capítulo 05 — Logística/passagem aérea)
5. Galeria do estande (renders 3D) — reaproveitada como Capítulo 04 (Expansão: stand + distribuição)
6. VSL (placeholder — trocar por vídeo do expert quando pronto)
7. Autoridade da editora + ticker de estatísticas (ajustado pra Bienal Rio + Internacional)
8. Galeria marquee — Capítulo 03 (fotos reais de autores/Bienal)
9. Pra quem é (critérios reais: nicho, faturamento, disponibilidade pra viajar)
10. Oferta + form (aplicação, sem preço — campos: segmento, faturamento, disponibilidade de viagem)
11. FAQ (seleção, não venda)
12. Footer

## 5. Copy
Herdada do funil `site-selecao-coordenadores/index.html` (aprovado), adaptada pro layout deste site.
Destino internacional confirmado: Portugal e Orlando (EUA) juntos, como um único "palco internacional" (não dois eventos separados).

## 6. Pendências (rastrear aqui)
- [x] Confirmado com o Dede: Portugal e Orlando (EUA) juntos compõem o único "palco internacional" (não são dois eventos/palcos separados). Copy atualizada em: proof bar do hero, Capítulo 04 "Dois palcos", ticker de estatísticas e FAQ.
- [x] CTAs (header + form-card) apontam direto para o formulário Spotform: `https://form.spotform.com.br/cmu77np3300ps01pbwlmh4nu6` (target="_blank"). Modal/webhook próprio (`SHEET_WEBHOOK_URL`, aponta pro sheet do Estande Bienal) ficou no código mas desconectado desses botões — não está mais em uso no fluxo principal.
- [x] VSL adicionada: embed do YouTube `zyRHZEy5V4c` na seção "Assista antes de decidir"
- [ ] Adicionar a arte "Seleção para Autores Internacionais" (Portugal + EUA, Bienal Rio 2027) que o Dede mandou, em formato horizontal, se for usar no hero
- [ ] FAQ real: pedir pro Dede as dúvidas mais comuns que os leads mandam hoje
- [ ] Hospedar (Vercel/Netlify) só quando aprovado — não subir sem ordem

## 7. Motion
- Sutil, fade-up on scroll
- **Reduced-motion:** IGNORAR — Dede quer animações tocando

## 8. Regras
- ✅ Tema claro marfim + dourado + bordô (padrão NAB aprovado)
- ❌ Não usar dark theme na base (só blocos de destaque como o combo)
