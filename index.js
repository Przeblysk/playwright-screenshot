import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

async function takeScreenshot(url) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const title = await page.title()

    const description = await page
      .$eval('meta[name="description"]', (el) => el.content)
      .catch(() => 'No description available')

    const folderName = new URL(url).hostname
    const folderPath = path.join(process.cwd(), folderName)

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    const screenshotPath = path.join(
      folderPath,
      `screenshot-${new Date().toISOString().replace(/[:.]/g, '-')}.png`
    )
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    })

    const metadata = {
      url,
      title,
      description,
      capturedAt: new Date().toISOString(),
    }

    fs.writeFileSync(
      path.join(folderPath, 'site.json'),
      JSON.stringify(metadata, null, 2)
    )

    console.log('Screenshot and metadata saved successfully!')
    console.log(`Folder: ${folderPath}`)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await browser.close()
  }
}

const url = process.argv[2] || 'https://example.com'
takeScreenshot(url).catch(console.error)
