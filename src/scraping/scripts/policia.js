module.exports = async (page, website) => {
    if(website === 'policia'){
        await page.goto(website.url);
        //await page.goto('https://antecedentes.policia.gov.co:7005/WebJudicial/');
        
        await page.waitForSelector("#aceptaOption\\:0");
        await page.evaluate(() => {
            let radio = document.querySelector("#aceptaOption\\:0");
            radio.click();
        });
        await page.waitForTimeout(2200);
        await page.mouse.click(0, 0);
        await page.waitForTimeout(1000);
        await page.waitForSelector("#continuarBtn");
        await page.click("#continuarBtn");

        await page.waitForSelector("#cedulaInput");
        await page.type("#cedulaInput", '18494458');

        //await page.waitForTimeout(1000);
        await page.waitForSelector("#j_idt17");
        await page.solveRecaptchas();
        await page.click("#j_idt17");

        const text = await page.$eval('span', element => element.textContent)
        console.log('Text in the H1: ' + text);
        await page.close();
       /* await Promise.all([
            page.waitForNavigation(),
            page.click("#j_idt17")
        ]);
        let nombre = await page.evaluate(() => {
            nombre = document.querySelector("#form:mensajeCiudadano");
        });*/
        //console.log("ok", value);
        //[@id="form:mensajeCiudadano"]/b[3]
        //await page.close();
    }       
    if(website === 'procuraduria'){

        await page.goto(website.url);

        await page.type("#txtNumID", '18494458');
        
        await page.select("select#ddlTipoID", 1);

        await page.waitForSelector("#txtNumID");
        
        await page.waitForSelector("#lblPregunta");

        const text = await page.$eval('#lblPregunta', element => element.textContent);

        console.log('Text in the H1: ' + text);
    }       
}