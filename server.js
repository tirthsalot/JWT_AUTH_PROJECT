import express from "express";
import dotenv from "dotenv";
import HttpError from "./middlewares/HttpError.js";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js"
dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use("/User",UserRoutes)
app.get("/", (req, res) => {
  res.json("JWT AUTHENTICATION PROJECT");
});
app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.status || 500)
    .json({ message: error.message || "internal server error" });
});
const port =  5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      return next(new HttpError("failed to connect db", 500));
    }
    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
startServer();