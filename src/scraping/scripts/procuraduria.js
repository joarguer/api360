module.exports = async (page, website) => {
    await page.goto(website.url);
    //await page.goto('https://antecedentes.policia.gov.co:7005/WebJudicial/');
    /*await page.evaluate(() => {
        const allDivs = document.querySelectorAll('.row');
        const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
        randomElement.click();
      });
    await page.waitForSelector('#aceptaOption\\:0');
    await page.evaluate(() => {
        let radio = document.querySelector('#aceptaOption\\:0');
        radio.click();
    });
    await page.waitForSelector('#continuarBtn');
    await page.evaluate(() => {
        let btn = document.querySelector('#continuarBtn');
        btn.click();
    }); */
    //llenaCuestionario(page);
}