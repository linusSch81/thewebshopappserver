/** File is also normally called 'App.js', 'Index.js' or 'Server.js' */

// const mongoose = require("mongoose");
import mongoose from "mongoose";

/** package-json: "type":"commonjs" (old way of including express) */
// const express = require("express")

/** package-json: "type":"module" (new way of including express) */
import express from "express";
/** CRUD: Create(application.post) Read(application.get) Update(application.put) Delete(application.delete)*/
const application = express();

import helmet from "helmet";
application.use(helmet());

import morgan from "morgan";
application.use(morgan("common"));

/** Middleware functions - måste tala om när den ska ta slut med 'next': https://expressjs.com/en/guide/writing-middleware.html */
const checkIfAdmin = (request, response, next) => {
  console.log("---\n RAN: @checkIfAdmin \n---");

  /** http://localhost:3001/throw?username=linus */
  console.log(
    "request.query.username: " + request.query.username + " \n---"
  );
  next();
};
application.use(checkIfAdmin);

/** http://localhost:3001/recipe */
/** get hämta, 'request': hämta, 'response': vad vi vill skicka tillbaka */
application.get("/recipe", (request, response) => {
  response.send("Ditt API anrop gick igenom");
});

/** http://localhost:3001/throw */
application.get("/throw", (request, response) => {
  response.send(Math.random().toString());
});

// const url = "mongodb://localhost/namndb";
const url = "mongodb://localhost:27017/namndb";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      "\n--- SUCCESSFULLY CONNECTED TO THE DATABASE ---\n " + url + " \n---\n"
    )
  )
  .catch((error) => {
    console.log(
      "\n--- ERROR WHILE TRYING TO CONNECT TO THE DATABASE ---\n " +
        error +
        " \n---\n"
    );
    process.exit();
  });

application.listen(3001, () => {
  console.log("Server är igång på port " + 3001);
});
