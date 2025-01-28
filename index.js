import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors   from "cors";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"

dotenv.config()


mongoose
  .connect("mongodb+srv://satyampandit021:20172522@rvbmhotelbooking.9hfzkrx.mongodb.net/news?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// for allowing json object in req body
app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.listen(5000, () => {
  console.log("Server is running on port 5000!")
})
app.get("/", (req, res) => {
  res.send("Hello l World!")
})
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
