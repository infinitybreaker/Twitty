import { Browser, Page, ElementHandle } from 'puppeteer';
import fs from 'fs';
import path from 'path';


interface Delay {
    min: number;
    max: number;
  }


export class puppeteerWrapper {
    private page: Page;
    private delay: Delay;
  /**
   * This class is used to wrap the puppeteer page object and add delays to the puppeteer functions.
   * 
   * @param page The puppeteer page object to be wrapped.
   * 
   * @param delay The delay to be added to the puppeteer functions.
   * 
   * @returns puppeteerWrapper object.
   */
    constructor(page: Page, delay: Delay) {
      this.page = page;
      this.delay = delay;
    }

    /**
     * 
     * A function to add a delay to the puppeteer functions.
     * 
     * @param min Minimum delay in milliseconds.
     * @param max Maximum delay in milliseconds.
     */
    private async sleep(min: number, max: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
    }
  
    /**
     * 
     * A function to type into a focused element that supports keyboard input. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     * 
     * @param selector A valid selector.
     * @param text Text to type into a focused element that supports keyboard input.
     * @param options The typing parameters.
     */
    async type(selector: string, text: string, options?: any): Promise<void> {

        await this.sleep(this.delay.min, this.delay.max);
        return this.page.type(selector, text, options);

    }
    
    /**
     * 
     * A function to click an element using a selector. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     * 
     * @param selector A valid selector.
     * @param options click options.
     */
    async click(selector: string, options?: any): Promise<void> {

        await this.sleep(this.delay.min/2, this.delay.max/2);
        const el = this.page.click(selector, options);
        await this.sleep(this.delay.min/2, this.delay.max/2);

        return el
    }
    /**
     * 
     * @param url A valid URL. The URL should include scheme, e.g. https://.
     * @param options Navigation parameters which might have the following properties: timeout, waitUntil, referer, and userAgent.
     */
    async goto(url: string, options?: any): Promise<void> {
        await this.page.goto(url, options);
      }

    /**
     * 
     * This function is used to wait for an element to be present in the DOM and to be visible. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     * 
     * @param selector A valid XPath selector.
     * @param options Click options.
     * @returns ElementHandle<Element> | null
     */
    async waitForSelector(selector: string, options?: any): Promise<ElementHandle<Element> | null> {
        const element = await this.page.waitForSelector(selector, options);
        return element;
    }

    /**
     * 
     * This function is used to click an element using an XPath selector. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     * 
     * @param selector A valid XPath selector.
     * @param options Click options.
     * 
     */
    async clickXPath(selector: string, options?: any): Promise<void> {
        await this.sleep(this.delay.min, this.delay.max);
        const elements = await this.page.$x(selector);
        if (elements.length > 0) {
          await (elements[0] as ElementHandle<Element>).click(options);
        } else {
          throw new Error(`No element found for XPath: ${selector}`);
        }
      }

    /**
     * This function is used to save the cookies to the cookies.json file.
     */
    async saveCookies(): Promise<void> {
        const cookies = await this.page.cookies();
        const cookiesFilePath = path.resolve(__dirname, 'cookies.json');
        fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies, null, 2));
    }

    /**
     * This function is used to load the cookies from the cookies.json file.
     */
    async loadCookies(): Promise<void> {
        const cookiesFilePath = path.resolve(__dirname, 'cookies.json');
        if (fs.existsSync(cookiesFilePath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf8'));
            await this.page.setCookie(...cookies);
        }
    }
      
    /**
     * 
     * @returns The puppeteer page object after wrapping the puppeteer page object with the puppeteerWrapper class, the puppeteer page object can be accessed using this function.
     */
    getPage(): Page {
        return this.page;
      }
  }