const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const app = require('express')();

puppeteer.use(StealthPlugin())
require('dotenv').config()

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
    } catch (e) {
        console.log(e);
    }
}

(async () => {
    let i = 0;
    while (true) {
        await run(process.argv[2] || process.env.MEET_LINK, process.env.USER_NAME + " " + i);
        i++;
    }
})();

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

// Initialize server
app.listen(5000, () => {
    console.log("Running on port 5000.");
});

module.exports = app;
