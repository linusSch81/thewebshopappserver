/**
 * This file is also normally called 'App.js', 'Index.js' or 'Server.js'
 * package-json: "type":"commonjs" (old way of including express)
 * //const express = require('express');
 * package-json: "type":"module" (new way of including express using EcmaScript Modules)
 * //import express from "express";
 */
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// import bodyParser from "body-parser";

import Middlewares from "./src/middleware/Middleware.js";
import Configuration from "./configurations/Configurations.js";

import UserRoutes from "./src/routes/User.route.js";

import cors from "cors"

const application = express();
application.use(express.json()); /** Instead of bodyParser */

application.use(cors({credentials: true}));

application.use(helmet());
application.use(morgan("common"));

UserRoutes.routes(application);
application.use(Middlewares.checkIfAdmin);

/** Read (GET): */
application.get("/", (request, response) => {
	response.send("<h1>Testing</h1><ul><li><a href='/recipe'>/recipe</a></li><li><a href='/throw'>/throw</a></li><li><a href='/throw?username=linus'>/throw?username=linus</a></li><li>REST client: <b>Insomnia Core</b><table><tr><td>post</td><td><i>/user</i></td><td></td><td><b>createUser</b></td></tr><tr><td>get</td><td><i>/user</i></td><td><a href='/user'>/user</a></td><td><b>getAllUsers</b></td></tr><tr><td>delete</td><td><i>/user/:userId</i></td><td></td><td><b>deleteUsers</b></td></tr><tr><td>put</td><td><i>/user/:userId</i></td><td></td><td><b>updateUser</b></td></tr><tr><td>get</td><td><i>/seasrch</i></td><td><a href='/search?username=Linus'>/search?username=Linus</a></td><td><b>queryUsername</b></td></tr><tr><td>get</td><td><i>/getuser/:userId</i></td><td><a href='/getuser/603d0a7ca2346a450ff4a0a8'>/getuser/603d0a7ca2346a450ff4a0a8</a></td><td><b>getUserById</b></td></tr></table></li></ul><h1>Info</h1><b>CRUD (Create, Read, Update, Delete)</b><ul><li>Create (POST) - Make something (application.post)</li><li>Read (GET)- Get something (application.get)</li><li>Update (PUT) - Change something (application.put)</li><li>Delete (DELETE) - Remove something (application.delete)</li></ul><ul><li><a href='http://expressjs.com/en/api.html#app.use'>application.use</a></li><li><a href='http://expressjs.com/en/api.html#app.get.method'>application.get</a></li><li><a href='https://expressjs.com/en/guide/writing-middleware.html'>Middleware functions</a></li></ul><p><b>MVC (Model View Controller)</b> - Design Pattern for fullstack API<br>VIEW <-> CONTROLLER <-> MODEL <-> <i><a href='https://medium.com/spidernitt/orm-and-odm-a-brief-introduction-369046ec57eb' title='e.g mongoose - ODM (Object Document Mapping) used for noSQL'>ODM</a></i> <-> <i>DATABASE</i></p>");
});
application.get("/recipe", (request, response) => {
	response.send("Ditt API anrop gick igenom");
});
application.get("/throw", (request, response) => {
	response.send(Math.random().toString());
});

/** 404 & error handeling */
application.use(Middlewares.notFound);
application.use(Middlewares.errorHandler);

Configuration.connectToDatabase();
Configuration.connectToPort(application);
