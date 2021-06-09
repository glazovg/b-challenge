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
        await (await this.webElements()).clientId.setValue(email)
        await (await this.webElements()).clientPassword.setValue(password)
        await this.clickElement((await this.webElements()).loginButton)
    }

    async isAuthNewDeviceMessageDisplayed() {
        try {
            await (await this.webElements()).authNewDevice.waitForDisplayed()
            return await (await this.webElements()).authNewDevice.isExisting()
        } catch (error) {
            return console.log('\x1b[32m%s\x1b[0m', `Device already authorized, continuing with execution...`)
        }
    }

    async open() {
        await super.open('/login')
    }
}

export default Login = new Login()