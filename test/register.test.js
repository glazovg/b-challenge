import MailSlurp from 'mailslurp-client'
import RegisterPage from '../page/Register.po'
import apiKey from '../mailslurp.conf'
import { expect } from 'chai'

const dataSet = require('../dataProvider/register-data.json')
const mailslurp = new MailSlurp({ apiKey });

let inbox;

dataSet.forEach(data => {
    describe('Register page', () => {
        before(async () => {
            await browser.maximizeWindow()
        })
        after(async () =>{
            await browser.reloadSession()
        })
        it(`Creating an Individual account - ${data.scenario}`, async () => {
            inbox = await mailslurp.createInbox()
            await RegisterPage.open()
            await RegisterPage.createAccount(data.country, inbox.emailAddress, data.password)
            const email = await mailslurp.waitForLatestEmail(inbox.id);
            const code = /[0-9]{6}/.exec(email.body);
            await RegisterPage.verifyCode(code)
            await browser.pause(5000)
            expect(await browser.getUrl()).to.include('welcome', 'Account was not created properly. :(')
        })
    })
})
