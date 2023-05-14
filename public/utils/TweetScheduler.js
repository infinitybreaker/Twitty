"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetScheduler = void 0;
const Main_1 = require("./Main");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
class TweetScheduler {
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
    constructor(wrappedPage) {
        this.wrappedPage = wrappedPage;
        this.minInterval = 2 * 60 * 1000; // 2 hours in milliseconds
        this.maxInterval = (24 * 60 * 1000) / 8 - this.minInterval; // Maximum possible interval to fit 8 tweets a day
    }
    getRandomInterval() {
        return this.minInterval + Math.random() * this.maxInterval;
    }
    /**
     *
     * A function to start the tweet scheduler.
     *
     * @param filePath The path to the text file containing the tweets to be posted one per line.
     */
    start(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweets = yield this.getTweetsFromTextFile(filePath);
            for (const tweetText of tweets) {
                yield (0, Main_1.tweetWithPuppeteer)(tweetText);
                const interval = this.getRandomInterval();
                console.log(`Waiting for ${interval / 1000} seconds before the next tweet.`);
                yield this.sleep(interval);
            }
        });
    }
    /**
     *
     * A function to get the tweets from a text file.
     *
     * @param filePath The path to the text file containing the tweets to be posted.
     * @returns A promise that resolves to an array of tweets.
     */
    getTweetsFromTextFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const tweets = [];
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
        });
    }
    sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, ms));
        });
    }
}
exports.TweetScheduler = TweetScheduler;
