Feature: Forgot Password

    As a user,
    I want to reset my password
    So that I can regain access to my account if I forget it.

    Scenario: User successfully resets password
        Given I open the login page
        When I click on "Mot de passe oublié ?"
        And I enter my email address and submit the reset form
        Then I should see link and a confirmation message
        When I retrieve the password reset link from Mailosaur
        Then I should be on the "Nouveau mot de passe" page
        When I enter a new password and confirm it
        Then I should be redirected to the login page
        When I log in with my email and the new password
        Then I should be redirected to the home page
