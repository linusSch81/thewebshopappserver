/**
 * Old import - mongoose:
 * //const mongoose = require("mongoose");
 * New import - mongoose:
 * //import mongoose from "mongoose";
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DATABASE_URL, PORT, ENVIRONMENT } = process.env;

//const url = "mongodb://localhost:27017/namndb";
//const PORT = 3001;
const url = DATABASE_URL;
const port = PORT;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`\n--- SUCCESSFULLY CONNECTED TO THE DATABASE ---`);
    ENVIRONMENT === "DEVELOPMENT" ? console.log(`\n ${DATABASE_URL} \n---`) : null;
  } catch (error) {
    console.log(`\n--- ERROR WHILE TRYING TO CONNECT TO THE DATABASE ---`);
    ENVIRONMENT === "DEVELOPMENT" ? console.log(`\n---\n ${error} \n---`) : null;
    process.exit();
  }
};

const connectToPort = (application) => {
  application.listen(PORT, () => {
    console.log(`\n--- CONNECTED TO PORT ---`);
    ENVIRONMENT === "DEVELOPMENT" ? console.log(`\n Server is up on port ${PORT} \n http://localhost:${PORT}/\n---`) : null;
  });
};

export default {
  connectToDatabase,
  connectToPort
};