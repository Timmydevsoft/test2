import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import handleError from "./error.middleware.js";
const verifyCookie = async (req, res, next) => {
  try {
    const accesshToken = req.cookies.accessToken;
    if (!accesshToken) return res.status(400).json("No credentials");
    jwt.verify(
      accesshToken,
      process.env.JWT_SECRET_KEY,
      async (err, decoded) => {
        if(err) return res.status(400).json("Not a valid user")
        const user = await User.findById(decoded.id)
        if(!user) return next(handleError(401, "You are not authorized"))
        req.id = user._id
       next()
      }
    );
  } catch (err) {
    next(err)
    console.log(err)
  }
};

export{verifyCookie}
