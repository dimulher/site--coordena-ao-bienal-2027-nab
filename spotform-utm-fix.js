// spotform-utm-fix.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('🔗 Abrindo Spotform...');
    await page.goto('https://dashboard.spotform.com.br/forms?search=teste-utms', {
      timeout: 15000,
      waitUntil: 'domcontentloaded'
    });

    console.log('⏳ Esperando carregar a página...');
    await page.waitForTimeout(2000);

    console.log('📋 Procurando formulário "teste-utms"...');

    // Tenta encontrar e clicar no formulário
    try {
      const formCard = await page.locator('heading:has-text("teste-utms")').first();
      if (await formCard.isVisible()) {
        console.log('✅ Formulário encontrado!');
        await formCard.click();
        await page.waitForTimeout(1500);
      }
    } catch (e) {
      console.log('⚠️ Formulário não encontrado pelo título');
    }

    // Tenta clicar em "Editar campos" ou "Gerenciar"
    try {
      const editBtn = await page.locator('button, a').filter({
        hasText: /Editar|Gerenciar|Builder/
      }).first();

      if (await editBtn.isVisible()) {
        console.log('✅ Botão de edição encontrado!');
        await editBtn.click();
        await page.waitForTimeout(2000);
      }
    } catch (e) {
      console.log('⚠️ Botão de edição não encontrado');
    }

    console.log('📸 Tirando screenshot da página atual...');
    await page.screenshot({ path: 'spotform-screenshot.png', fullPage: true });
    console.log('✅ Screenshot salvo como: spotform-screenshot.png');

    console.log('\n📍 URL atual:', page.url());
    console.log('🔴 Navegador mantido aberto. Feche quando terminar.');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    await page.screenshot({ path: 'spotform-erro.png', fullPage: true });
    console.log('❌ Screenshot do erro: spotform-erro.png');
  } finally {
    // Mantém o navegador aberto
    // await browser.close();
  }
})();
