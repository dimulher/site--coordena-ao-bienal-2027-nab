# Setup Vercel — site-oferta-de-entrada-nab

## ✅ O que foi feito

1. **Meta Pixel ativado:** ID `599258489828023`
2. **Spotform integrado:** `https://form.spotform.com.br/cmnxj394x1fy701myrwg94m9z`
3. **Rastreamento de UTMs:** Automático via `preserveUtm()`
4. **Push para GitHub:** `https://github.com/dimulher/site-oferta-de-ebtrada-nab.git`

---

## 🚀 Próximo passo: Reconectar Vercel

### Opção A: Via Painel Vercel (RECOMENDADO)

1. Acesse: https://vercel.com/projects
2. Procure pelo projeto `site-drab-ten-79`
3. Vá em **Settings → Git**
4. Clique em **"Disconnect Git Repository"**
5. Clique em **"Connect Git Repository"**
6. Selecione `github` (se não estiver conectado, autorize)
7. Procure por `dimulher/site-oferta-de-ebtrada-nab`
8. Clique em **"Connect"**
9. **Pronto!** Vercel vai fazer deploy automático

### Opção B: Via Vercel CLI

```bash
cd C:\Users\dede\Documents\projetos-claude-dede\site-oferta-nab
vercel link --repo github.com/dimulher/site-oferta-de-ebtrada-nab
vercel deploy --prod
```

---

## 📊 Fluxo de Rastreamento Agora

```
Meta Ads (com UTMs)
    ↓
Landing Page (site-drab-ten-79.vercel.app/?utm_campaign=...)
    ↓
JavaScript captura UTMs (preserveUtm())
    ↓
Spotform (form.spotform.com.br?utm_campaign=...)
    ↓
Lead preenchido com dados de rastreamento ✅
    ↓
Meta Pixel rastreia conversão ✅
```

---

## ✅ Checklist Final

- [ ] Reconectar Vercel ao GitHub
- [ ] Fazer novo deploy (deve ser automático)
- [ ] Testar com 1 clique real de anúncio Meta
- [ ] Verificar se UTMs aparecem no Spotform
- [ ] Confirmar se Meta Pixel rastreia a conversão

---

## 🧪 Como Testar

1. **Clique em um anúncio Meta** com UTMs
2. **Na landing page**, abra DevTools (F12)
3. **Execute no Console:**
   ```javascript
   console.log(_utm)
   ```
4. **Você deve ver:**
   ```json
   {
     "utm_source": "meta",
     "utm_campaign": "oferta_entrada",
     "utm_content": "landing_page",
     "utm_term": null,
     "utm_medium": null
   }
   ```
5. **Clique em "QUERO MEU ACESSO"**
6. **Você será redirecionado para Spotform COM os UTMs na URL**
7. **Preencha o formulário e confirme**
8. **No dashboard do Spotform**, verifique se os dados foram salvos com os UTMs

---

Pronto! 🎉
