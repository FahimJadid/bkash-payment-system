const express = require("express");
const app = express();
require("dotenv").config();

const connectToDatabase = require("./config/database");
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
    await connectToDatabase();
  } catch (error) {
    console.error("Error starting the server: ", error.message);
    process.exit(1);
  }
};

startServer();
