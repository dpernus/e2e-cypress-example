describe("Form test", () => {
  it("Can fill the form", () => {
    cy.visit("/");
    cy.get("form");

    cy.get('input[id="name"]')
      .type('Jhon Doe')
      .should('have.value', 'Jhon Doe');
    
    cy.get('input[id="email"]')
      .type('jhon@test.com')
      .should('have.value', 'jhon@test.com')

    cy.get("textarea")
      .type("Mind you if I ask some question?")
      .should("have.value", "Mind you if I ask some question?");

    cy.server();
    cy.route({
      url: "/users/**",
      method: "POST",
      response: { status: "Form saved!", code: 201 }
    });
    
    cy.get("form").submit();

    cy.contains("Form saved!");
  });
});