import MailSlurp, { ExpiredControllerApiFactory } from 'mailslurp-client'
import Page from '../page/Page.po'
import LoginPage from '../page/Login.po'
import WalletPage from '../page/Wallet.po'
import Beneficiary from '../page/Beneficiary.po'
import { expect } from 'chai'

import apiKey from '../mailslurp.conf'

const dataSet = require('../dataProvider/register-data.json')
const mailslurp = new MailSlurp({ apiKey });
const page = new Page()

dataSet.forEach(data => {
    describe('Bitso page', () => {
        before(async () => {
            await browser.maximizeWindow()
        })
        after(async () => {
            await browser.reloadSession()
        })
        it(`Adding a beneficiary - ${data.scenario}`, async () => {
            await LoginPage.open()
            await LoginPage.login(data.email, data.password)

            if (await LoginPage.isAuthNewDeviceMessageDisplayed()) {
                const email = await mailslurp.waitForLatestEmail(data.inboxId);
                const regex = RegExp('https:\/\/devmalta\.bitso\.com\/auth_device\/[a-zA-Z0-9]*')
                const authPath = regex.exec(email.body)[0];
                console.log('\x1b[32m%s\x1b[0m', `AUTH URL: ${authPath}`)
                page.open(authPath)
            }

            await browser.pause(10000)

            for (let i = 1; i < 9; i++) {
                await WalletPage.cryptoDeposit(i)
                await browser.pause(3000)
                const isWarningMessageDisplayed = await (await WalletPage.webElements()).alertDepositMessage.isExisting()
                expect(isWarningMessageDisplayed,'Warning message not displayed properly.').to.be.true
                await browser.keys('Escape')
            }

            await Beneficiary.open()
            await browser.pause(4000)
            await Beneficiary.addBeneficiary(
                data.beneficiaryName, data.beneficiaryLastName, data.beneficiarySecondLastName,
                data.dateOfBirth, data.relationshipOption, data.benefitPercentage)
            await Beneficiary.confirmBeneficiary(data.pin)
            const iserrorMessageDisplayed = await (await Beneficiary.webElements()).errorMessage.isExisting()
            expect(iserrorMessageDisplayed,'Error message was displayed, beneficiary not added :(.').to.be.true
        })
    })
});
