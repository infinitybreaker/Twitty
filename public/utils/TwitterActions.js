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
exports.postTweet = exports.login = void 0;
const config_1 = require("../config");
/**
 * Actions to be performed on twitter using puppeteer stealth plugin to login.
 *
 * @param page This is the puppeteerWrapper object to be used to login to twitter.
 *
 */
function login(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto('https://twitter.com/i/flow/login');
        yield page.waitForSelector("input[name='text']");
        yield page.type("input[name='text']", config_1.TWITTER_USERNAME);
        yield page.clickXPath("//span[text()='Next']");
        yield page.waitForSelector("input[name='password']");
        yield page.type("input[name='password']", config_1.TWITTER_PASSWORD);
        yield page.clickXPath("//span[text()='Log in']");
        yield page.waitForSelector("a[href='/compose/tweet']");
        yield page.saveCookies();
    });
}
exports.login = login;
/**
 * Actions to be performed on twitter using puppeteer stealth plugin to post a tweet.
 *
 * @param page This is the puppeteerWrapper object to be used to post a tweet.
 *
 */
function postTweet(page, tweetText) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForSelector("a[href='/compose/tweet']");
        yield page.click("a[href='/compose/tweet']");
        const tweetBox = page.waitForSelector("div > .DraftEditor-editorContainer");
        yield page.type("div > .DraftEditor-editorContainer", tweetText);
        yield page.clickXPath("//span[text()='Tweet']");
    });
}
exports.postTweet = postTweet;
