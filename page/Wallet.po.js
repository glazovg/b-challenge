import Page from './Page.po'

class Wallet extends Page {
    async webElements() {
        const cryptoCurrency = await $('label.styles__Name-go4zwh-1[for]')
        const riskMessage = await $('.styles__WrapperContainer-sc-1yl4qxp-5 .styles__WarningIconDiv-sc-94xnsk-0')
        const riskCheckBox = await $$('.moon-val_check')
        const acceptRiskButton = await $('[data-testid="crypto-risk-warning-button"]')
        const depositButton = await $('.moon-arrow_deposit')

        return { cryptoCurrency, riskMessage, riskCheckBox, acceptRiskButton, depositButton }
    }
    //Crypto options goes from 1 to 9
    async cryptoDeposit(cryptoOption) {
        await this.clickElement()
        await (await this.webElements()).cryptoCurrency[cryptoOption].click()
        await (await this.webElements()).depositButton.click()
        try {
            await (await this.webElements()).riskCheckBox.waitForDisplayed()
            if (await (await this.webElements()).riskCheckBox.isExisting()){
                await this.clickElement((await this.webElements()).riskCheckBox)
                await this.clickElement((await this.webElements()).acceptRiskButton)
            }
        } catch (error) {
            return console.log('\x1b[32m%s\x1b[0m', `Risk agreement was previously accepted, continuing with execution...`)
        }
    }

    async open() {
        await super.open('/wallet')
    }
}

export default Wallet = new Wallet()