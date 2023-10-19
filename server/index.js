import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { loginValidator, registerValidator } from "./helpers/validators.js"
import handleValidationErrors from "./middlewares/handleValidationErrors.js"
import { UserController } from "./controllers/index.js"
import isAuth from "./middlewares/isAuth.js"

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB was connected!"))
  .catch((error) => console.log(error + "error"))

const app = express()

app.use(express.json())
app.use(cors())

app.post(
  "/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
)
app.post("/login", loginValidator, handleValidationErrors, UserController.login)
app.get("/me", isAuth, UserController.getUser)

const PORT = process.env.PORT || 4444

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }

  console.log("Server was started on port: " + PORT)
})
