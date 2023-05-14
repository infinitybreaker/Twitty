import { puppeteerWrapper } from './PuppeteerWrapper';
import { startBrowser } from './Browser';
import { login, postTweet } from './TwitterActions';


/**
 * This function is used to post a tweet using puppeteer stealth plugin. 
 * It uses the puppeteerWrapper class to wrap the puppeteer page object and add delays to the puppeteer functions. 
 * It also uses the login and postTweet functions to login to twitter and post a tweet.
 * 
 * @param tweetText The text of the tweet to be posted.
 * 
 */
export async function tweetWithPuppeteer(tweetText: string): Promise<void> {
  const browser = await startBrowser();
  const page = await browser.newPage();
  const wrappedPage = new puppeteerWrapper(page, { min: 1000, max: 3000 });
  
  await wrappedPage.loadCookies();
  await wrappedPage.goto('https://twitter.com/home');
  
  try {
    await wrappedPage.waitForSelector("a[href='/compose/tweet']");
  } catch (e) {
    console.log((e as Error).message);
    await login(wrappedPage);
  }
  await postTweet(wrappedPage, tweetText);

  await wrappedPage.saveCookies();
  await browser.close();

}
