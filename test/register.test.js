import MailSlurp from 'mailslurp-client'
import RegisterPage from '../page/Register.po'
import apiKey from '../mailslurp.conf'
const mailslurp = new MailSlurp({ apiKey });

let inbox;
let password = "Test-password1";

describe('Register page', () => {
    it('Creating an Individual account', async () => {
        inbox = await mailslurp.createInbox()
        RegisterPage.open()
        RegisterPage.createAccount(inbox.emailAddress,password)
        const email = await mailslurp.waitForLatestEmail(inbox.id);
        const code = /[0-9]{6}/.exec(email.body);
        RegisterPage.verifyCode(code)
        await browser.pause(2000)
    })
})