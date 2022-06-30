//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
//const path = require('path');
const consulta = require('./scripts/consulta');
//const websites = require('./websites.json');

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
        devtools: false
    });
    const page = await browser.newPage();

    const nombre = await consulta(page,'procuraduria',cedula);

    const data = {
        name: nombre
    };
    await browser.close();

    console.log(data);

    return data;

};
//consultar('18494458');
exports.consultar = consultar;