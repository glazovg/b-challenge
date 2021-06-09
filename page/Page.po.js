export default class Page {
    constructor() {
        this.title = 'Dev Malta Bitso'
    }

    async webElements() {
        const profileMenu = await $('.styles__WrapperLabel-sc-1wdqgcn-1=Profile')
        const logoutButton = await $('[href="/logout"]')
        return { profileMenu, logoutButton }
    }

    async open(path) {
        await browser.url(path)
    }

    async clickElement(element) {
        await browser.execute("arguments[0].click()", element)
    }

    async bitsoLogout() {
        await (await this.webElements()).profileMenu.waitForDisplayed()
        await (await this.webElements()).profileMenu.moveTo()
        await (await this.webElements()).logoutButton.click()
    }
}