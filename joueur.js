import puppeteer from 'puppeteer'
import mysql from 'mysql2/promise'

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'floorball',
        port: 3307,
    })

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    const maxId = 1001000
    let players = []

    for (let id = 1000000; id <= maxId; id++) {
        const url = `https://www.floorballbelgium.be/en/players/${id}`
        await page.goto(url, { waitUntil: 'domcontentloaded' })

        await page.waitForSelector('.h4.ng-star-inserted', { timeout: 1000 }).catch(() => null)

        const playerName = await page.evaluate(() => {
            const player = document.querySelector('.h4.ng-star-inserted')
            return player ? player.innerText.trim() : null
        })

        if (playerName) {
            console.log(`✅ Joueur trouvé: ${playerName} (ID du site: ${id})`)

            const [rows] = await connection.execute(
                'INSERT INTO players (idSite, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?',
                [id, playerName, playerName]
            )

            players.push({ id, name: playerName })
        } else {
            console.log(`❌ Pas de joueur pour l'ID: ${id}`)
        }
    }

    await browser.close()
    await connection.end()
})()