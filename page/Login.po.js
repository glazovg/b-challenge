import Page from './Page.po'

class Login extends Page {
    async webElements() {
        const clientId = await $('#client_id')
        const clientPassword = await $('#password')
        const loginButton = await $('button[type="submit"]=Log In')

        return { clientId, clientPassword, loginButton }
    }

    async login(email, password) {
        await (await this.webElements()).clientId.setValue(email)
        await (await this.webElements()).clientPassword.setValue(password)
        await (await this.webElements()).loginButton.click()
    }

    async open() {
        await super.open('/login')
    }
}

export default Login = new Login()