// file is also normally called 'App.js', 'Index.js' or 'Server.js'

/** package-json: "type":"commonjs" (old way of including express) */
// const express = require("express")

/** package-json: "type":"module" (new way of including express) */
import express from "express";

/** CRUD create (application.post) read (application.get) update (application.put) delete (application.delete)*/
const application = express();

/** http://localhost:3001/recipe */
/** get hämta, 'request': hämta, 'response': vad vi vil lskicka tillbaka */
application.get("/recipe", (request, response) => {
  response.send("Ditt API anrop gick igenom");
});

/** http://localhost:3001/throw */
application.get("/throw", (request, response) => {
  response.send(Math.random().toString());
});

application.listen(3001, () => {
  console.log("Server är igång på port " + 3001);
});
