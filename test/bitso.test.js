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
            await browser.maximizeWindow()
        })
        after(async () => {
            await browser.reloadSession()
        })
        it(`Adding a beneficiary - ${data.scenario}`, async () => {
            LoginPage.open()
            LoginPage.login(data.email, data.password)
            
            if (await LoginPage.isAuthNewDeviceMessageDisplayed()) {
                const email = await mailslurp.waitForLatestEmail(data.inboxId);
                const regex = RegExp('https:\/\/devmalta\.bitso\.com\/auth_device\/[a-zA-Z0-9]*')
                const authPath = regex.exec(email.body)[0];
                console.log('\x1b[32m%s\x1b[0m', `AUTH URL: ${authPath}`)
                page.open(authPath)
            }
            
            await browser.pause(7000)

            for (let i = 1; i < 9; i++) {
                await WalletPage.cryptoDeposit(i)
                expect((await WalletPage.webElements()).alertDepositMessage).toBeDisplayed()
                await browser.pause(4000)
                await browser.keys('Escape')
            }
        })
    })
});
