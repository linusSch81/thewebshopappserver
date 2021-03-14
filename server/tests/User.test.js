/** 
 * Remeber to shut down server (vscode terminal window) before running this 
 * as this, when run starts the server.
 * start test with "npm run test".
 */
import Chai from "chai";
import ChaiHTTP from "chai-http";
import { describe, it as test } from "mocha";
import StatusCode from "../configurations/StatusCode.js";
import application from "../Server.js";

Chai.should();
Chai.use(ChaiHTTP);

const randomString = Math.random().toString(36).substring(7);

const testingNonExistingRoute = () => {
	//describe("Testing Non Existing Route", () => {
	// callback
	test("HTTP call against a route that does not exist in the API", (done) => {
		Chai.request(application)
			// .get("/return-404-error-please")
			.get(`/${randomString}`)
			.end((request, response) => {
				response.should.have.a.status(StatusCode.NOT_FOUND_404);
				done();
			});
	});
	//});
};

const getAllUsers = () => {
	test("Expecting a return of all users in database", (done) => {
		Chai.request(application)
			.get("/user")
			.end((request, response) => {
				response.should.have.a.status(StatusCode.OK_200);
				response.body.should.be.a("array");
				/** Check if there are 6 users */
				// response.body.length.should.be.eq(6);
				done();
			});
	});
};
const updateUser = () => {
	const testUserID = "603d0cec414c15465e2bceaa";
	const testUserName = "UserTestUpdateUser123";
	const testPassword = "password123";
	test("Should manipulate data of a current object in the user entity", (done) => {
		Chai.request(application)
			.put(`/user/${testUserID}`)
			.send({ username: testUserName, password: testPassword })
			.end((request, response) => {
				response.should.have.a.status(StatusCode.OK_200);
				response.should.be.a("object");
				response.body.should.have.property("_id").eq(testUserID);
				response.body.should.have.property("username").eq(testUserName);
				response.body.should.have.property("password").eq(testPassword);
				done();
			});
	});
};

describe("TESTING THE USER API ENTITY", () => {
	testingNonExistingRoute();
	getAllUsers();
	updateUser();
});
