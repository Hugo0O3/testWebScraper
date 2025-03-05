import fetch from "node-fetch"
import * as cheerio from "cheerio"

const url = "https://deux.io/web-scraping-puppeteer/"

async function getTitle() {
    try {
        const response = await fetch(url)
        const body = await response.text()

        const $ = cheerio.load(body)

        const title = $("title").text()

        console.log("Titre de la page :", title)
    } catch (error) {
        console.error("Erreur lors du scraping :", error)
    }
}

getTitle()