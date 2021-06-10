import Page from './Page.po'

class Beneficiary extends Page {
    async webElements() {
        const appWrapper = await $('#root')
        const beneficiaryForm = await $('.Form__StyledForm-sc-1f7vh8u-0')
        const firstNameField = await $('#first_name')
        const lastNameField = await $('#last_name')
        const secondLastNameField = await $('#second_last_name')
        const dateOfBirthField = await $('#dob')
        const kinshipDropdown = await $('.css-tdzd0p')
        const kinshipOption = await $$('[id*="react-select-2-option"]')
        const benefitPercentage = await $('#percentage')
        const addButton = await $('[data-testid="add-beneficiary-button"]')
        const pinField = await $('#pin')
        const confirmButton = await $('button=Confirm')
        const errorMessage = await $('div[type="error"]')

        return {
            appWrapper, beneficiaryForm, firstNameField, lastNameField, secondLastNameField, dateOfBirthField,
            kinshipDropdown, kinshipOption, benefitPercentage, addButton, pinField, confirmButton, errorMessage
        }
    }
    //kinship options goes from 0 to 2, TODO dropdown element handled with browser.keys as workaround need future fix
    async addBeneficiary(firstName, lastName, secondLastName, dateOfBirth, relationshipOption, percentage) {
        await (await this.webElements()).beneficiaryForm.waitForExist({ timeout: 6000 })
        await (await this.webElements()).firstNameField.setValue(firstName)
        await (await this.webElements()).lastNameField.setValue(lastName)
        await (await this.webElements()).secondLastNameField.setValue(secondLastName)
        await (await this.webElements()).dateOfBirthField.setValue(dateOfBirth)
        await browser.keys('Tab')
        await browser.keys('ArrowDown')
        await browser.keys('Enter')
        await (await this.webElements()).benefitPercentage.setValue(percentage)
        await (await this.webElements()).addButton.waitForEnabled()
        await this.clickElement((await this.webElements()).addButton)
    }

    async confirmBeneficiary(pin) {
        await (await this.webElements()).pinField.waitForExist({ timeout: 3000 })
        await (await this.webElements()).pinField.setValue(pin)
        await (await this.webElements()).confirmButton.waitForEnabled()
        await this.clickElement((await this.webElements()).confirmButton)
    }

    async open() {
        await super.open('/r/user/beneficiaries/add')
    }
}

export default Beneficiary = new Beneficiary()