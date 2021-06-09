export default class Page {
    constructor() {
        this.title = 'Dev Malta Bitso'
    }

    async open(path) {
        await browser.url(path)
    }
}