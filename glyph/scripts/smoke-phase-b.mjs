import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:5173/");
await page.waitForSelector("#board .cell");

const version = await page.textContent("#version");

await page.click(".rune:not(.used)");
await page.click("#board .cell.empty");
await page.click("#board .cell.spark-ready");

await page.waitForSelector(".credits.show", { timeout: 8000 });

const hope = await page.textContent("#vHope");
const chain = await page.textContent("#vChain");
const score = await page.textContent("#vScore");
const litCount = await page.locator(".cell.lit").count();

console.log(
  JSON.stringify({
    ok: true,
    version,
    hope,
    chain,
    score,
    litCount,
  })
);

await browser.close();
