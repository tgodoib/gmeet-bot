const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require("path");
const app = require('express')();
const bodyParser = require('body-parser');

puppeteer.use(StealthPlugin())
require('dotenv').config()
app.use(bodyParser.urlencoded({extended: true}));

async function run(link, name) {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--incognito',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-infobars',
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();

        await page.goto(link);

        let allowMicCamSelector = '#yDmH0d > div.VfPpkd-Sx9Kwc.cC1eCc.UDxLd.PzCPDd.Qb2h6b.xInSQ.PBbOsf.VfPpkd-Sx9Kwc-OWXEXe-FNFY6c > div.VfPpkd-wzTsW > div > div > div > div > div.VlHPz > div > div:nth-child(2) > button';

        await page.waitForSelector(allowMicCamSelector);
        await page.click(allowMicCamSelector);

        await new Promise(r => setTimeout(r, 1000));
        await page.type('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.qIHHZb > div.Ufn6O.jX7fTc > label > input', name);

        await page.click('#yDmH0d > c-wiz > div > div > div:nth-child(15) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button')

        await browser.close();
        browser.process().kill();
    } catch (e) {
        console.log(e);
    }
}

let link = "";

async function try_run() {
    if (link !== "") await run(link, process.env.USER_NAME);
    setTimeout(try_run, 1000);
}

setTimeout(try_run, 1000);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/run", (req, res) => {
    if (Object.keys(req.body).includes('start')) link = req.body.link;
    else link = "";
    res.sendStatus(200);
});

app.listen(8080, () => {
    console.log("Running on port 8080.");
});

module.exports = app;
