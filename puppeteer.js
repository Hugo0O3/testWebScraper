import * as puppeteer from "puppeteer"

(async () => {
    const browser = await puppeteer.launch({ headless: true })

    const page = await browser.newPage()

    await page.goto("https://deux.io/web-scraping-puppeteer/", { waitUntil: 'domcontentloaded' })

    const title = await page.title()

    console.log("Titre de la page :", title)

    await browser.close()
})()
