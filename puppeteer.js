import * as puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: true }) // Mettre false c'est une dinguerie
    const page = await browser.newPage()

    await page.goto('https://www.floorballbelgium.be/en/competitions', { waitUntil: 'networkidle2' })

    await page.waitForSelector('.title_comp')

    const leagues = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.title_comp'))
            .map(league => league.innerText.trim())
    })

    console.log("Ligues disponibles pour 2024-2025 :", leagues)

    await browser.close();
})();