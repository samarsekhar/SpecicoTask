import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import studentsRoute from "./routes/studentRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("server is running");
});

app.use("/students", studentsRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Application is running to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
