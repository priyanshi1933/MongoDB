import mongoose from "mongoose";
import express from "express";
import router from "./routes/route";
import cors, { CorsOptions } from "cors";
import path from "path"
import requestLogger from "./middleware/logger.middleware";

mongoose
  .connect("mongodb://localhost:27017/ts_demo")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Connection err: ", err));

const app = express();

const corsOptions:CorsOptions={
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials:true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.listen(3000, () => {
  console.log("Server running on the port 3000");
});
