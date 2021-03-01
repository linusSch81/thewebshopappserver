import UserController from "../controllers/User.controller.js";

/** vilken CRUD */
const routes = (application) => {
	application.post("/user", UserController.createUser);
	application.get("/user", UserController.getAllUsers);
};

export default {
	routes,
};
