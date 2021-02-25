/**
 * This file is also normally called 'App.js', 'Index.js' or 'Server.js'
 * package-json: "type":"commonjs" (old way of including express)
 * //const express = require('express');
 * package-json: "type":"module" (new way of including express using EcmaScript Modules)
 * //import express from "express";
 *
 * CRUD: Create(application.post) Read(application.get) Update(application.put) Delete(application.delete)
 * - Create (POST) - Make something (application.post)
 * - Read (GET)- Get something (application.get)
 * - Update (PUT) - Change something (application.put)
 * - Delete (DELETE) - Remove something (application.delete)
 *
 * application.get http://expressjs.com/en/api.html#app.get.method
 * application.use http://expressjs.com/en/api.html#app.use
 *
 */
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import Middlewares from "./src/middleware/Middleware.js";
import Configuration from "./configurations/Configurations.js";

const application = express();
application.use(helmet());
application.use(morgan("common"));

application.use(Middlewares.checkIfAdmin);

/** Read (GET):
 * http://localhost:3001/recipe
 * http://localhost:3001/throw
 */
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
