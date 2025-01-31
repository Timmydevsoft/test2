import express from "express"
import { createPost, getAllPost, getPostById, deletePost, updatePost } from "../controllers/post.controller.js"
import { verifyAuth } from "../middleware/auth.middleware.js"

const postRouter = express.Router()
verifyAuth
postRouter.route("/post").post(verifyAuth, createPost)
postRouter.route("/post").get(verifyAuth, getAllPost)
postRouter.route("/post/:id").get(verifyAuth,getPostById)
postRouter.route("/post/:id").put(verifyAuth,  updatePost)
postRouter.route("/post/:id").delete(verifyAuth, deletePost)

export default postRouter