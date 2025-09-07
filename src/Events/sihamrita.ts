import puppeteer from 'puppeteer';

export async function sihamritaposts ()  {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/sih.amrita", { waitUntil: 'networkidle2' });

  // Wait for a visible part of the profile page, like the bio or posts
  await page.waitForSelector('.html-span.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1hl2dhg.x16tdsg8.x1vvkbs'); // adjust this

  const content = await page.evaluate(() => {
    const el = document.querySelector('.html-span.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1hl2dhg.x16tdsg8.x1vvkbs') || document.querySelector('span');
    return el?.textContent || "Not found";
  });



  browser.close();
  return content;
    };
