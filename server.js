const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connectToDatabase = require("./config/database");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const paymentRouter = require("./routes/paymentRoutes");

const PORT = process.env.PORT || 4040;

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/payment", paymentRouter);

app.use(notFound);
app.use(errorHandler);

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
