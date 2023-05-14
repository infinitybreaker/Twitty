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
const Browser_1 = require("./utils/Browser");
const PuppeteerWrapper_1 = require("./utils/PuppeteerWrapper");
const TweetScheduler_1 = require("./utils/TweetScheduler");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield (0, Browser_1.startBrowser)();
    const page = yield browser.newPage();
    const wrappedPage = new PuppeteerWrapper_1.puppeteerWrapper(page, { min: 1000, max: 3000 });
    const scheduler = new TweetScheduler_1.TweetScheduler(wrappedPage);
    yield scheduler.start('tweets.txt');
}))();
