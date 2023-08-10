describe("Login form validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("email validation", () => {
    cy.get("#user-mail").type("e@");
    cy.contains("Please enter a valid email address.");
  });

  /*   it("email validation with e@a", () => {
    cy.get("#user-mail").type("e@");
    cy.contains("Please enter a valid email address."); not!!
  }); */

  it("password validation", () => {
    cy.get("#user-pass").type("aa");
    cy.contains("Passwords must be at least 6 characters long.");
  });

  it("button disabled validation", () => {
    cy.get("[data-cy=login-button]").should("be.disabled");
  });

  it("button enabled validation", () => {
    cy.get("#name").type("Emra");
    cy.get("#surname").type("Çatal");
    cy.get("#user-pass").type("aaaaaaaa");
    cy.get("#user-mail").type("e@a");
    cy.get("#checkbox").check();
    cy.get("[data-cy=login-button]").should("be.enabled");
  });

  it("console.log", () => {
    cy.get("form");
    cy.contains("not.have.console.log");
  });
});
