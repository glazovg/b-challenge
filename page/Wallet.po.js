import Page from './Page.po'

class Wallet extends Page {
    async webElements() {
        const cryptoCurrency = await $$('.styles__Currency-go4zwh-4')
        const riskMessage = await $('.styles__WrapperContainer-sc-1yl4qxp-5 .styles__WarningIconDiv-sc-94xnsk-0')
        const riskCheckBox = await $$('.moon-val_check')
        const acceptRiskButton = await $('[data-testid="crypto-risk-warning-button"]')
        const depositButton = await $('.moon-arrow_deposit')
        const alertDepositMessage = await $('h3=Oops! Something went wrong')

        return { cryptoCurrency, riskMessage, riskCheckBox, acceptRiskButton, depositButton, alertDepositMessage }
    }
    //Crypto options goes from 1 to 9
    async cryptoDeposit(cryptoOption) {
        await (await this.webElements()).cryptoCurrency[cryptoOption].waitForExist()
        await this.clickElement((await this.webElements()).cryptoCurrency[cryptoOption])
        await (await this.webElements()).depositButton.waitForDisplayed()
        await this.clickElement((await this.webElements()).depositButton)
        try {
            if (await (await this.webElements()).riskCheckBox.isExisting()) {
                await (await this.webElements()).riskCheckBox.waitForDisplayed()
                await this.clickElement((await this.webElements()).riskCheckBox)
                await this.clickElement((await this.webElements()).acceptRiskButton)
            }
        } catch (error) {
            return
        }
    }

    async open() {
        await super.open('/r/wallet')
    }
}

export default Wallet = new Wallet()