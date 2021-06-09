import MailSlurp, { ExpiredControllerApiFactory } from 'mailslurp-client'
import Page from '../page/Page.po'
import LoginPage from '../page/Login.po'
import WalletPage from '../page/Wallet.po'

import apiKey from '../mailslurp.conf'

const dataSet = require('../dataProvider/register-data.json')
const mailslurp = new MailSlurp({ apiKey });
const page = new Page()

let inbox;

dataSet.forEach(data => {
    describe('Bitso page', () => {
        before(async () => {
            LoginPage.open()
            LoginPage.login(data.email, data.password)
            console.log('\x1b[32m%s\x1b[0m', `IS AUTH DISPLAYED ${await LoginPage.isAuthNewDeviceMessageDisplayed()}`)
            if (await LoginPage.isAuthNewDeviceMessageDisplayed()) {
                const email = await mailslurp.waitForLatestEmail(data.inboxId);
                const regex = RegExp('https:\/\/devmalta\.bitso\.com\/auth_device\/[a-zA-Z0-9]*')
                const authPath = regex.exec(email.body)[0];
                console.log('\x1b[32m%s\x1b[0m', `AUTH URL: ${authPath}`)
                page.open(authPath)
            }
        })
        after(async () => {
            await page.bitsoLogout()
            await browser.reloadSession()
        })
        it(`Adding a beneficiary - ${data.scenario}`, async () => {
            WalletPage.open()
            WalletPage.cryptoDeposit(1)
            await browser.pause(3000)
        })
    })
});
