import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from 'puppeteer';

puppeteer.use(StealthPlugin());

/**
 * 
 * @returns A headfull puppeteer browser object using the extra stealth plugin with 
 * the no-sandbox, disable-setuid-sandbox and disable-web-security flags.
 * 
 * 
 */
export async function startBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
    ],
  });
  return browser;
}
