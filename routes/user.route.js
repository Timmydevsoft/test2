import express from "express"
import { verifyAuth } from "../middleware/auth.middleware.js"
import { createUser, deleteUser,  getAuser, updateUser } from "../controllers/user.controller.js"
const userRouter = express.Router()

userRouter.route("/user").post(createUser)
userRouter.route("/user/:id").get(verifyAuth, getAuser)
userRouter.route("/user/:id").put(  verifyAuth, updateUser)
userRouter.route("/user/:id").delete( verifyAuth, deleteUser)

export default userRouter