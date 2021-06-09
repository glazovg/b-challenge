import MailSlurp from 'mailslurp-client'
import RegisterPage from '../page/Register.po'
import apiKey from '../mailslurp.conf'

const dataSet = require('../dataProvider/register-data.json')
const mailslurp = new MailSlurp({ apiKey });

let inbox;

dataSet.forEach(data => {
    describe.skip('Register page', () => {
        after(async () =>{
            await browser.reloadSession()
        })
        it(`Creating an Individual account - ${data.scenario}`, async () => {
            inbox = await mailslurp.createInbox()
            RegisterPage.open()
            RegisterPage.createAccount(data.country, inbox.emailAddress, data.password)
            const email = await mailslurp.waitForLatestEmail(inbox.id);
            const code = /[0-9]{6}/.exec(email.body);
            RegisterPage.verifyCode(code)
            await browser.pause(2000)
        })
    })
})
