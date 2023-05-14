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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.puppeteerWrapper = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class puppeteerWrapper {
    /**
     * This class is used to wrap the puppeteer page object and add delays to the puppeteer functions.
     *
     * @param page The puppeteer page object to be wrapped.
     *
     * @param delay The delay to be added to the puppeteer functions.
     *
     * @returns puppeteerWrapper object.
     */
    constructor(page, delay) {
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
    sleep(min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
        });
    }
    /**
     *
     * A function to type into a focused element that supports keyboard input. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     *
     * @param selector A valid selector.
     * @param text Text to type into a focused element that supports keyboard input.
     * @param options The typing parameters.
     */
    type(selector, text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(this.delay.min, this.delay.max);
            return this.page.type(selector, text, options);
        });
    }
    /**
     *
     * A function to click an element using a selector. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     *
     * @param selector A valid selector.
     * @param options click options.
     */
    click(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(this.delay.min / 2, this.delay.max / 2);
            const el = this.page.click(selector, options);
            yield this.sleep(this.delay.min / 2, this.delay.max / 2);
            return el;
        });
    }
    /**
     *
     * @param url A valid URL. The URL should include scheme, e.g. https://.
     * @param options Navigation parameters which might have the following properties: timeout, waitUntil, referer, and userAgent.
     */
    goto(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(url, options);
        });
    }
    /**
     *
     * This function is used to wait for an element to be present in the DOM and to be visible. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     *
     * @param selector A valid XPath selector.
     * @param options Click options.
     * @returns ElementHandle<Element> | null
     */
    waitForSelector(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.page.waitForSelector(selector, options);
            return element;
        });
    }
    /**
     *
     * This function is used to click an element using an XPath selector. It uses the puppeteerWrapper sleep function to add delays to the puppeteer functions.
     *
     * @param selector A valid XPath selector.
     * @param options Click options.
     *
     */
    clickXPath(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleep(this.delay.min, this.delay.max);
            const elements = yield this.page.$x(selector);
            if (elements.length > 0) {
                yield elements[0].click(options);
            }
            else {
                throw new Error(`No element found for XPath: ${selector}`);
            }
        });
    }
    /**
     * This function is used to save the cookies to the cookies.json file.
     */
    saveCookies() {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = yield this.page.cookies();
            const cookiesFilePath = path_1.default.resolve(__dirname, 'cookies.json');
            fs_1.default.writeFileSync(cookiesFilePath, JSON.stringify(cookies, null, 2));
        });
    }
    /**
     * This function is used to load the cookies from the cookies.json file.
     */
    loadCookies() {
        return __awaiter(this, void 0, void 0, function* () {
            const cookiesFilePath = path_1.default.resolve(__dirname, 'cookies.json');
            if (fs_1.default.existsSync(cookiesFilePath)) {
                const cookies = JSON.parse(fs_1.default.readFileSync(cookiesFilePath, 'utf8'));
                yield this.page.setCookie(...cookies);
            }
        });
    }
    /**
     *
     * @returns The puppeteer page object after wrapping the puppeteer page object with the puppeteerWrapper class, the puppeteer page object can be accessed using this function.
     */
    getPage() {
        return this.page;
    }
}
exports.puppeteerWrapper = puppeteerWrapper;
