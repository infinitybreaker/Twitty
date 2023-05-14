import { puppeteerWrapper } from './PuppeteerWrapper';
import { tweetWithPuppeteer } from './Main';
import * as fs from 'fs';
import * as readline from 'readline';


export class TweetScheduler {
  private wrappedPage: puppeteerWrapper;
  private minInterval: number;
  private maxInterval: number;

  /**
   * This class is used to schedule tweets from a text file.
   * 
   * @param wrappedPage The puppeteerWrapper object to be used to post the tweets.
   * 
   * @param minInterval The minimum interval between tweets in milliseconds.
   * 
   * @param maxInterval The maximum interval between tweets in milliseconds.
   * 
   * @param filePath The path to the text file containing the tweets to be posted.
   * 
   */
  constructor(wrappedPage: puppeteerWrapper) {
    this.wrappedPage = wrappedPage;
    this.minInterval = 2 * 60 * 1000; // 2 hours in milliseconds
    this.maxInterval = (24 * 60 * 1000) / 8 - this.minInterval; // Maximum possible interval to fit 8 tweets a day
  }

  private getRandomInterval(): number {
    return this.minInterval + Math.random() * this.maxInterval; 
  }


  /**
   * 
   * A function to start the tweet scheduler.
   * 
   * @param filePath The path to the text file containing the tweets to be posted one per line.
   */
  async start(filePath: string): Promise<void> {
    const tweets = await this.getTweetsFromTextFile(filePath);
      for (const tweetText of tweets) {
        await tweetWithPuppeteer(tweetText);
        const interval = this.getRandomInterval();
        console.log(`Waiting for ${interval / 1000} seconds before the next tweet.`);
        await this.sleep(interval);
      }
  }

  /**
   * 
   * A function to get the tweets from a text file.
   * 
   * @param filePath The path to the text file containing the tweets to be posted.
   * @returns A promise that resolves to an array of tweets.
   */
  private async getTweetsFromTextFile(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const tweets: string[] = [];
      const reader = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
      });
  
      reader.on('line', (line) => {
        tweets.push(line);
      });
  
      reader.on('close', () => {
        resolve(tweets);
      });
  
      reader.on('error', (err) => {
        reject(err);
      });
    });
}
private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  
}