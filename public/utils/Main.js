"use strict";
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
exports.tweetWithPuppeteer = void 0;
const PuppeteerWrapper_1 = require("./PuppeteerWrapper");
const Browser_1 = require("./Browser");
const TwitterActions_1 = require("./TwitterActions");
/**
 * This function is used to post a tweet using puppeteer stealth plugin.
 * It uses the puppeteerWrapper class to wrap the puppeteer page object and add delays to the puppeteer functions.
 * It also uses the login and postTweet functions to login to twitter and post a tweet.
 *
 * @param tweetText The text of the tweet to be posted.
 *
 */
function tweetWithPuppeteer(tweetText) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield (0, Browser_1.startBrowser)();
        const page = yield browser.newPage();
        const wrappedPage = new PuppeteerWrapper_1.puppeteerWrapper(page, { min: 1000, max: 3000 });
        yield wrappedPage.loadCookies();
        yield wrappedPage.goto('https://twitter.com/home');
        try {
            yield wrappedPage.waitForSelector("a[href='/compose/tweet']");
        }
        catch (e) {
            console.log(e.message);
            yield (0, TwitterActions_1.login)(wrappedPage);
        }
        yield (0, TwitterActions_1.postTweet)(wrappedPage, tweetText);
        yield wrappedPage.saveCookies();
        yield browser.close();
    });
}
exports.tweetWithPuppeteer = tweetWithPuppeteer;
