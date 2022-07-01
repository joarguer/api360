import {Router} from 'express';
//VERSION 1.0.0 .1.0.0
//SCRAPING
import puppeteer from 'puppeteer-extra';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';

const router = Router();

import axios from 'axios';

router.get('/', async (req, res) => {
    const data = {'data': 'api requiere credenciales'};
    res.send(data);
});

router.post('/policia', async (req, res) => {
  let data = {'data': 'Sin servicio'};
  res.json(data);
  return false; 
  let cedula = req.body.cc;
  let usuario = req.body.usuario;
  let password = req.body.password;
  
  const params = new URLSearchParams();
  params.append('usuario', usuario);
  params.append('password', password);
  
  axios({
      method: 'post',
      url: 'https://verificacion360.com/site/ajax/apiKey.php',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: params
    }).then(function (resp) {
      console.log('status',resp.data);
      if(resp.data == 1){
          console.log('Policia busca cedula: ',cedula);
          consultar(cedula);
      } else{
          console.log('Error: ','key errado!');
          let data = {'data': 'key errado!'};
          res.json(data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
    async function consultar(cedula){
        puppeteer.use(
            RecaptchaPlugin({
                provider: {
                  id: '2captcha',
                  token: '75cbbd220b713f360d193e3af3e24166' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
                },
                visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
            })
        )
        const browser = await puppeteer.launch({
          headless: false,
          args: ['--use-gl=egl']
        })
      
        const page = await browser.newPage();
    
        const text = await consulta(page,'policia',cedula);
    
        const data = {
            name: text
        };
        //await browser.close();
        if(text !== 'error'){
            //return data;
            console.log(data);
            res.json(data);
        } else{
            console.log('error');
            res.json('error');
            return 'error';
            //consultar(cedula);
        }
        //console.log('->',data);
    
    };
});

router.post('/registraduria', async (req, res) => {
    //console.log(req.body);
    let cedula = req.body.cc;
    let usuario = req.body.usuario;
    let password = req.body.password;
    
    const params = new URLSearchParams();
    params.append('usuario', usuario);
    params.append('password', password);
    //axios.post('https://verificacion360.com/site/ajax/apiKey.php', todo)
    
    axios({
        method: 'post',
        url: 'https://verificacion360.com/site/ajax/apiKey.php',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: params
      }).then(function (resp) {
        console.log('status',resp.data);
        if(resp.data == 1){
            console.log('Registraduria busca cedula: ',cedula);
            consultar(cedula);
        } else{
            console.log('Error: ','key errado!');
            let data = {'data': 'key errado!'};
            res.json(data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    async function consultar(cedula){
        puppeteer.use(
            RecaptchaPlugin({
                provider: {
                id: '2captcha',
                token: '75cbbd220b713f360d193e3af3e24166' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
                },
                visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
            })
        )
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
    
        const nombre = await consulta(page,'procuraduria',cedula);
    
        const data = {
            name: nombre
        };
        await browser.close();
        if(nombre !== false){
            //return data;
            console.log(data);
            res.json(data);
        } else{
           // return 'error';
            console.log(data);
            //res.json(data);
            consultar(cedula);
        }
        //console.log('->',data);
    
    };
});

async function consulta(page, website, cedula) {
    //POLICIA
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
      console.log('escribir cedula');
      await page.type("#cedulaInput", "18494458");
  
      //await page.waitForTimeout(1000);
      //await page.waitForSelector("#j_idt17");
      console.log('resolver captchat');
      await page.solveRecaptchas();
      console.log('captchat resuelto');
      //await page.waitForTimeout(1000);
      console.log('click buscar');

      await page.click("#j_idt17");

      //await page.waitForSelector('#form\:j_idt8_content > table');   #form\:mensajeCiudadano > b:nth-child(6)   #form\:j_idt8_content > table

      //const table = await page.$eval('#form\:j_idt8_content > table', (element) => element.textContent);

      //await page.waitForSelector('#form\:mensajeCiudadano');

      //const text = await page.$eval('#form\:mensajeCiudadano', (element) => element.textContent); //*[@id="form:mensajeCiudadano"]/b[3]
      //console.log("Text : ",text);
      //console.log("Table : ",table);
      return;
      //await page.close();
      //console.log("ok", value);
      //[@id="form:mensajeCiudadano"]/b[3]
      //await page.close();
    }

    //REGISTRADURIA
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

export default router;