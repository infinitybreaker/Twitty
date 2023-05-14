import { startBrowser } from './utils/Browser';
import { puppeteerWrapper } from './utils/PuppeteerWrapper';
import { TweetScheduler } from './utils/TweetScheduler';

(async () => {
  const browser = await startBrowser();
  const page = await browser.newPage();
  const wrappedPage = new puppeteerWrapper(page, { min: 1000, max: 3000 });


  const scheduler = new TweetScheduler(wrappedPage);
  await scheduler.start('tweets.txt'); 


})();
