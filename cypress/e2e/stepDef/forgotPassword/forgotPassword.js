import { When, Then, Given } from "cypress-cucumber-preprocessor/steps";
import forgotPassword from "../../../pageObject/pageActions/forgotPassword/forgotPassword";
const mailosaur = require('../../../fixtures/dataPassword/mailosaur.json');

Given('I open the login page', () => {
    forgotPassword.visitMyStore();
});

When('I click on "Mot de passe oublié ?"', async () => {
    forgotPassword.linkForgotPassword();
});

And('I enter my email address and submit the reset form', () => {
    const credentials = mailosaur.mailosaur
    forgotPassword.resetPassword(credentials.email);
})

Then('I should see link and a confirmation message', () => {
    forgotPassword.checkSuccessMsg();
});

When('I retrieve the password reset link from Mailosaur', () => {
    const credentials = mailosaur.mailosaur

    forgotPassword.getResetLink(credentials.email);
});

Then('I should be on the "Nouveau mot de passe" page', () => {
    forgotPassword.assertPageNewPassword();
});

When('I enter a new password and confirm it', () => {
    forgotPassword.submitNewPassword();
});

Then('I should be redirected to the login page', () => {
    forgotPassword.assertUrlLogin();
});
When('I log in with my email and the new password', () => {
    const credentials = mailosaur.mailosaur
    forgotPassword.loginWithNewPwd(credentials.email);
});

Then('I should be redirected to the home page', () => {
    forgotPassword.assertUrl();
});