import { TWITTER_USERNAME, TWITTER_PASSWORD } from '../config'
import { puppeteerWrapper } from './PuppeteerWrapper';

/**
 * Actions to be performed on twitter using puppeteer stealth plugin to login.
 * 
 * @param page This is the puppeteerWrapper object to be used to login to twitter.
 * 
 */
  export async function login(page: puppeteerWrapper): Promise<void> {

    await page.goto('https://twitter.com/i/flow/login');
    
    await page.waitForSelector("input[name='text']");
    await page.type("input[name='text']", TWITTER_USERNAME);
  
    await page.clickXPath("//span[text()='Next']");
  
    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", TWITTER_PASSWORD);
  
    await page.clickXPath("//span[text()='Log in']");
  
    await page.waitForSelector("a[href='/compose/tweet']");

    await page.saveCookies();
  
  }


/**
 * Actions to be performed on twitter using puppeteer stealth plugin to post a tweet.
 * 
 * @param page This is the puppeteerWrapper object to be used to post a tweet.
 * 
 */
  export async function postTweet(
    page: puppeteerWrapper,
    tweetText: string
  ): Promise<void> {
    await page.waitForSelector("a[href='/compose/tweet']");
    await page.click("a[href='/compose/tweet']");

    const tweetBox = page.waitForSelector("div > .DraftEditor-editorContainer")
    await page.type("div > .DraftEditor-editorContainer", tweetText)

    await page.clickXPath("//span[text()='Tweet']");
  
   
  }