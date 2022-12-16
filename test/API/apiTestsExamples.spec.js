const request = require("supertest")("https://airportgap.dev-tester.com/api");
const expect = require("chai").expect;

// example #1 - GET
describe("GET /airports", () => {

    it("GET | all airports, limited to 30 per page", async () => {
        const response = await request.get("/airports");

        expect(response.status).to.eql(200);
        expect(response.body.data.length).to.eql(30);
    });
});

// Example #2 - POST
describe("POST /airports/distance", () => {

    it("POST | calculates the distance between two airports", async () => {
        const response = await request
            .post("/airports/distance")
            .send({ from: "KIX", to: "SFO" });

        expect(response.status).to.eql(200);

        const attributes = response.body.data.attributes;
        expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
        expect(attributes.kilometers).to.eql(8692.06650824004);
        expect(attributes.miles).to.eql(5397.23985349201);
        expect(attributes.nautical_miles).to.eql(4690.070954910591);
    });
});

// Example #4 - PUT and Delete with Authorization
describe("POST with Authorization - /favorites", () => {

    it("requires authentication", async () => {
        const response = await request
            .post("/favorites")
            // sending the payload without authorization header
            .send({
                airport_id: "JFK",
                note: "My usual layover when visiting family"
            });

        expect(response.status).to.eql(401); // Expecting Authorization error
    });

    it("allows an user to save and delete their favorite airports", async () => {
        // the authorization token does not exist in the env. variable process.env.AIRPORT_GAP_TOKEN
        // So, this test should fail and created for the demo purpose only.

        // Check that a user can create a favorite.
        const postResponse = await request
            .post("/favorites")
            // setting the authorization header
            .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`)
            // sending the payload with authorization header
            .send({
                airport_id: "JFK",
                note: "My usual layover when visiting family"
            });

        expect(postResponse.status).to.eql(201);
        expect(postResponse.body.data.attributes.airport.name).to.eql("John F Kennedy International Airport");
        expect(postResponse.body.data.attributes.note).to.eql("My usual layover when visiting family");

        const favoriteId = postResponse.body.data.id;

        // Check that a user can update the note of the created favorite.
        const putResponse = await request
            .put(`/favorites/${favoriteId}`)
            .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`)
            .send({
                note: "My usual layover when visiting family and friends"
            });

        expect(putResponse.status).to.eql(200);
        expect(putResponse.body.data.attributes.note).to.eql("My usual layover when visiting family and friends");

        // Check that a user can delete the created favorite.
        const deleteResponse = await request
            .delete(`/favorites/${favoriteId}`)
            .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

        expect(deleteResponse.status).to.eql(204);

        // Verify that the record was deleted.
        const getResponse = await request
            .get(`/favorites/${favoriteId}`)
            .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

        expect(getResponse.status).to.eql(404);
    });
});