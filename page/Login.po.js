import Page from './Page.po'

class Login extends Page {
    async webElements() {
        const clientId = await $('#client_id')
        const clientPassword = await $('#password')
        const loginButton = await $('button[type="submit"]*=Log')
        const authNewDevice = await $('.moon-laptop')

        return { clientId, clientPassword, loginButton, authNewDevice }
    }

    async login(email, password) {
        await (await this.webElements()).clientId.waitForDisplayed()
        await (await this.webElements()).clientId.setValue(email)
        await (await this.webElements()).clientPassword.setValue(password)
        await (await this.webElements()).loginButton.waitForEnabled()
        await this.clickElement((await this.webElements()).loginButton)
    }

    async isAuthNewDeviceMessageDisplayed() {
        try {
            await (await this.webElements()).authNewDevice.waitForExist()
            return await (await this.webElements()).authNewDevice.isExisting()
        } catch (error) {
            return
        }
    }

    async open() {
        await super.open('/login')
    }
}

export default Login = new Login()