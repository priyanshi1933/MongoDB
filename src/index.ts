import mongoose from "mongoose";
import express from "express";
import router from "./routes/route";
import cors, { CorsOptions } from "cors";
import path from "path"
import helmet from "helmet";
// import rateLimit from "express-rate-limit";
import requestLogger from "./middleware/logger.middleware";
import dotenv from "dotenv";
dotenv.config();

const connectionString=process.env.MONGO_URI as string;
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Connection err: ", err));

const PORT=process.env.PORT || 3001;

const app = express();

const corsOptions:CorsOptions={
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials:true
};
// const limiter=rateLimit({
//   windowMs:1*60*1000,
//   max:5,
//   message:"Too many requests from this IP, please try again later."
// })
app.use(helmet());
// app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use(router);


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
