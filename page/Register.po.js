import Page from './Page.po'

class Register extends Page {
    async webElements() {
        const emailInput = await $('#email')
        const passwordInput = await $('#password')
        const passwordConfirmation = await $('#password_confirmation')
        const registerCheckBox = await $$('.moon-val_check')
        const startButton = await $('button[type="submit"]=Start')
        const codeInput = await $('[inputMode="numeric"]')
        return { emailInput, passwordInput, passwordConfirmation, registerCheckBox, startButton, codeInput }
    }

    async createAccount(email, password) {
        await (await this.webElements()).emailInput.setValue(email)
        await (await this.webElements()).passwordInput.setValue(password)
        await (await this.webElements()).passwordConfirmation.setValue(password)
        await (await this.webElements()).registerCheckBox[0].scrollIntoView()
        await browser.execute("arguments[0].click()", (await this.webElements()).registerCheckBox[0])
        await browser.execute("arguments[0].click()", (await this.webElements()).registerCheckBox[2])
        await browser.execute("arguments[0].click()", (await this.webElements()).registerCheckBox[3])
        await (await this.webElements()).startButton.waitForEnabled()
        await browser.execute("arguments[0].click()", (await this.webElements()).startButton)
    }

    async verifyCode(code) {
        await (await this.webElements()).codeInput.setValue(code)
    }

    async open() {
        await super.open('/register')
    }
}

export default Register = new Register()