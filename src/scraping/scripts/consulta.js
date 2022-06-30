/*
module.exports = async (page, website, cedula) => {
    if(website === 'policia'){
        await page.goto('https://antecedentes.policia.gov.co:7005/WebJudicial/');
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
        //console.log("ok", value);
        //[@id="form:mensajeCiudadano"]/b[3]
        //await page.close();
    }       
    if(website === 'procuraduria'){

        let documentNumber = cedula;

        await page.goto('https://apps.procuraduria.gov.co/webcert/inicio.aspx?tpo=1');

        await page.type("#txtNumID", documentNumber);
        
        await page.select("select#ddlTipoID", '1');

        await page.waitForSelector("#txtNumID");
        
        await page.waitForSelector("#lblPregunta");

        const question = await page.$eval('#lblPregunta', element => element.textContent);

        let responseQuestion = "";

        if (question === "¿ Cuanto es 2 X 3 ?") {
            responseQuestion = "6";
        } else if (question === "¿ Cual es la Capital de Antioquia (sin tilde)?") {
            responseQuestion = "medellin";
        } else if (question === "¿ Cuanto es 3 - 2 ?") { 
            responseQuestion = "1";
        } else if (question === "¿ Cuanto es 4 + 3 ?") {
            responseQuestion = "7";
        } else if (question === "¿ Cuanto es 5 + 3 ?") {
            responseQuestion = "8";
        } else if (question === "¿ Cual es la Capital del Atlantico?") {
            responseQuestion = "barranquilla";
        } else if (question === "¿ Cual es la Capital del Vallle del Cauca?") {
            responseQuestion = "cali";
        } else if (question === "¿Escriba los tres primeros digitos del documento a consultar?") {
            responseQuestion = documentNumber.substring(0, 3);
        } else if (question === "¿ Cual es la Capital de Colombia (sin tilde)?") {
            responseQuestion = "bogota";
        } else if (question === "¿Escriba los dos ultimos digitos del documento a consultar?") {
            responseQuestion = documentNumber.slice(-2);
        } else if (question === "¿ Cuanto es 3 X 3 ?") {
            responseQuestion = "9";
        } else if (question === "¿ Cuanto es 9 - 2 ?") {
            responseQuestion = "7";
        } else if (question === "¿ Cuanto es 6 + 2 ?") {
            responseQuestion = "8";
        } else {
            responseQuestion = 'none';
        } 
        //return question+'->'+responseQuestion;
        //return;
        //console.log('Question: ' + question + ' -> Response: ' + responseQuestion);
        if (responseQuestion !== "" && responseQuestion !== "none") {
            await page.type("#txtRespuestaPregunta", responseQuestion);

            await page.click("#btnConsultar");

            await page.waitForTimeout(1000);

            await page.waitForSelector("div#ValidationSummary1");

            //await page.evaluate('document.querySelector("div#ValidationSummary1").getAttribute("style")');
                
            const errorDiv = await page.$eval('div#ValidationSummary1', element => element.textContent);

            //const error = await page.$eval('div#ValidationSummary1', element => element.getAttribute('style'));
            //console.log('Error: ' + errorDiv.trim());
            if (errorDiv.trim() === "EL NÚMERO DE IDENTIFICACIÓN INGRESADO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA.") {
                await page.close();
                return 'no existe';
            } else{
            
                await page.waitForSelector(".datosConsultado");
                
                const nombre_1 = await page.$eval('#divSec > div > span:nth-child(1)', element => element.textContent);

                const nombre_2 = await page.$eval('#divSec > div > span:nth-child(2)', element => element.textContent);

                const nombre_3 = await page.$eval('#divSec > div > span:nth-child(3)', element => element.textContent);

                const nombre_4 = await page.$eval('#divSec > div > span:nth-child(4)', element => element.textContent);
                
                const nombre_completo = nombre_1 + ' ' + nombre_2 + ' ' + nombre_3 + ' ' + nombre_4;

                await page.close();
                
                return nombre_completo;
            }
            console.log('respuesta scraping: ok');
        } else {
            console.log('respuesta scraping: error');
            await page.close();
            return false;
        }
    }       
}
*/
async function consulta(page, website, cedula) {
  if (website === "policia") {
    await page.goto("https://antecedentes.policia.gov.co:7005/WebJudicial/");
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
    await page.type("#cedulaInput", cedula);

    //await page.waitForTimeout(1000);
    await page.waitForSelector("#j_idt17");
    await page.solveRecaptchas();
    await page.click("#j_idt17");

    const text = await page.$eval("span", (element) => element.textContent);
    console.log("Text in the H1: " + text);
    await page.close();
    return text;
    //console.log("ok", value);
    //[@id="form:mensajeCiudadano"]/b[3]
    //await page.close();
  }
  if (website === "procuraduria") {
    let documentNumber = cedula;

    await page.goto(
      "https://apps.procuraduria.gov.co/webcert/inicio.aspx?tpo=1"
    );

    await page.type("#txtNumID", documentNumber);

    await page.select("select#ddlTipoID", "1");

    await page.waitForSelector("#txtNumID");

    await page.waitForSelector("#lblPregunta");

    const question = await page.$eval(
      "#lblPregunta",
      (element) => element.textContent
    );

    let responseQuestion = "";

    if (question === "¿ Cuanto es 2 X 3 ?") {
      responseQuestion = "6";
    } else if (question === "¿ Cual es la Capital de Antioquia (sin tilde)?") {
      responseQuestion = "medellin";
    } else if (question === "¿ Cuanto es 3 - 2 ?") {
      responseQuestion = "1";
    } else if (question === "¿ Cuanto es 4 + 3 ?") {
      responseQuestion = "7";
    } else if (question === "¿ Cuanto es 5 + 3 ?") {
      responseQuestion = "8";
    } else if (question === "¿ Cual es la Capital del Atlantico?") {
      responseQuestion = "barranquilla";
    } else if (question === "¿ Cual es la Capital del Vallle del Cauca?") {
      responseQuestion = "cali";
    } else if (
      question ===
      "¿Escriba los tres primeros digitos del documento a consultar?"
    ) {
      responseQuestion = documentNumber.substring(0, 3);
    } else if (question === "¿ Cual es la Capital de Colombia (sin tilde)?") {
      responseQuestion = "bogota";
    } else if (
      question === "¿Escriba los dos ultimos digitos del documento a consultar?"
    ) {
      responseQuestion = documentNumber.slice(-2);
    } else if (question === "¿ Cuanto es 3 X 3 ?") {
      responseQuestion = "9";
    } else if (question === "¿ Cuanto es 9 - 2 ?") {
      responseQuestion = "7";
    } else if (question === "¿ Cuanto es 6 + 2 ?") {
      responseQuestion = "8";
    } else {
      responseQuestion = "none";
    }
    //return question+'->'+responseQuestion;
    //return;
    //console.log('Question: ' + question + ' -> Response: ' + responseQuestion);
    if (responseQuestion !== "" && responseQuestion !== "none") {
      await page.type("#txtRespuestaPregunta", responseQuestion);

      await page.click("#btnConsultar");

      await page.waitForTimeout(1000);

      await page.waitForSelector("div#ValidationSummary1");

      //await page.evaluate('document.querySelector("div#ValidationSummary1").getAttribute("style")');

      const errorDiv = await page.$eval(
        "div#ValidationSummary1",
        (element) => element.textContent
      );

      //const error = await page.$eval('div#ValidationSummary1', element => element.getAttribute('style'));
      //console.log('Error: ' + errorDiv.trim());
      if (
        errorDiv.trim() ===
        "EL NÚMERO DE IDENTIFICACIÓN INGRESADO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA."
      ) {
        await page.close();
        return "no existe";
      } else {
        await page.waitForSelector(".datosConsultado");

        const nombre_1 = await page.$eval(
          "#divSec > div > span:nth-child(1)",
          (element) => element.textContent
        );

        const nombre_2 = await page.$eval(
          "#divSec > div > span:nth-child(2)",
          (element) => element.textContent
        );

        const nombre_3 = await page.$eval(
          "#divSec > div > span:nth-child(3)",
          (element) => element.textContent
        );

        const nombre_4 = await page.$eval(
          "#divSec > div > span:nth-child(4)",
          (element) => element.textContent
        );

        const nombre_completo =
          nombre_1 + " " + nombre_2 + " " + nombre_3 + " " + nombre_4;

        await page.close();

        return nombre_completo;
      }
      console.log("respuesta scraping: ok");
    } else {
      console.log("respuesta scraping: error");
      await page.close();
      return false;
    }
  }
}
export default consulta();