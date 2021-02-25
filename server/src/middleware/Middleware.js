/** 
 * Middleware functions - Have to tell when to end with next(), see https://expressjs.com/en/guide/writing-middleware.html 
 */

import dotenv from "dotenv";
dotenv.config();
const { ENVIRONMENT } = process.env;

/** http://localhost:3001/throw?username=linus */
const checkIfAdmin = (request, response, next) => {
  console.log(
    "RAN: @checkIfAdmin \n request.query.username: " +
      request.query.username +
      " \n---"
  );
  next();
};

/** 404 handeling */
const notFound = (request, response, next) => {
  const error = new Error("Invalid URL - NOT FOUND");
  response.status(404);
  next(error);
};

/** Error Handeling */
const errorHandler = (error, request, response, next) => {
  const statuscode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statuscode);
  response.json({
    statuscode: statuscode,
    message: error.message,
    // stackTrace: error.stack,
    stackTrace: ENVIRONMENT === "DEVELOPMENT" ? error.stack : null,
  });
};

export default {
  checkIfAdmin,
  notFound,
  errorHandler,
};
