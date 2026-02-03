import mongoose from "mongoose";
import express from "express";
import router from "./routes/route";
import cors from "cors";


mongoose
  .connect("mongodb://localhost:27017/ts_demo")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Connection err: ", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(3000, () => {
  console.log("Server running on the port 3000");
});
