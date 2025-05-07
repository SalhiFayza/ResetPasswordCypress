import selectPassword from "../../pageElements/forgotPassword/selectPassword";
const serverId = 'yourServerID';

class ForgotPassword {
    visitMyStore() {
        cy.visit('/login');
    }
    linkForgotPassword() {
        cy.contains(selectPassword.link, 'Mot de passe oublié ?').should('exist').click();
    }
    resetPassword(email) {
        cy.get(selectPassword.email).type(email);
        cy.get(selectPassword.btnSubmit).click();
    }
    checkSuccessMsg() {
        cy.url().should('equal', 'https://mystory-cosmetics.shop/forgotpassword');
        cy.get(selectPassword.successMsg)
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Votre demande de réinitialisation de mot de passe a été envoyée.');

    }

    getResetLink(emailMailosaur) {
        const now = new Date();
        cy.wait(3000);
        cy.mailosaurGetMessage(serverId, {
            sentTo: emailMailosaur,
            subject: 'MyStory Réinitialiser le mot de passe',
            receivedAfter: now
        }, { timeout: 20000 })
            .then(email => {
                const resetLink = email.html.links[0].href;
                cy.log('Reset Link:', resetLink);
                cy.visit(resetLink, { failOnStatusCode: false });
            });
    }

    assertPageNewPassword() {
        cy.get(selectPassword.loginTitle)
            .should('exist')
            .and('be.visible')
            .invoke('text')
            .then((text) => text.trim())
            .should('equal', 'Nouveau mot de passe');
        cy.url().should('contain', '/password.reset/token');
    }

    submitNewPassword() {
        cy.wait(3000);
        const newPwd = generatePassword();
        cy.get(selectPassword.inputPassword).type(newPwd);
        cy.get(selectPassword.inputPasswordConf).type(newPwd);
        Cypress.env('newpassword', newPwd);
        cy.get(selectPassword.btnSubmit).click();
    }

    assertUrlLogin() {
        cy.url().should('equal', 'https://mystory-cosmetics.shop/login');
    }
    loginWithNewPwd(emailMailosaur) {
        cy.wait(5000);
        const newpassword = Cypress.env('newpassword');
        cy.get(selectPassword.emailLogin).type(emailMailosaur);
        cy.get(selectPassword.passwordLogin).type(newpassword);
        cy.get(selectPassword.btnLogin).click();
    }

    assertUrl() {
        cy.url().then((url) => {
            expect(new URL(url).origin + '/').to.equal('https://mystory-cosmetics.shop/');
        });
    }
}
export default new ForgotPassword();
function generatePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const randomString = Array.from({ length: 9 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    return randomString;
}