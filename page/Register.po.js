import Page from './Page.po'

class Register extends Page {
    async webElements() {
        const countryResidence = await $('#country')
        const emailInput = await $('#email')
        const passwordInput = await $('#password')
        const passwordConfirmation = await $('#password_confirmation')
        const registerCheckBox = await $$('.moon-val_check')
        const startButton = await $('button[type="submit"]=Start')
        const codeInput = await $('[inputMode="numeric"]')
        return { countryResidence, emailInput, passwordInput, passwordConfirmation, registerCheckBox, startButton, codeInput }
    }

    async createAccount(country, email, password) {
        if (country !== 'Mexico') {
            await (await this.webElements()).countryResidence.setValue(country)
            await browser.keys('Enter')
        }
        await (await this.webElements()).emailInput.setValue(email)
        await (await this.webElements()).passwordInput.setValue(password)
        await (await this.webElements()).passwordConfirmation.setValue(password)
        await (await this.webElements()).registerCheckBox[0].scrollIntoView()
        await this.clickElement((await this.webElements()).registerCheckBox[0])
        await this.clickElement((await this.webElements()).registerCheckBox[2])
        if (country === 'Mexico') await this.clickElement((await this.webElements()).registerCheckBox[3])
        await (await this.webElements()).startButton.waitForEnabled()
        await this.clickElement((await this.webElements()).startButton)
    }

    async verifyCode(code) {
        await (await this.webElements()).codeInput.setValue(code)
    }

    async open() {
        await super.open('/register')
    }
}

export default Register = new Register()