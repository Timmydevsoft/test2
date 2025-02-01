import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import handleError from "./error.middleware.js";

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    let authToken;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      authToken= authHeader.split(" ")[1];
      jwt.verify(authToken, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(403).json(err.message);
        }
        const user = await User.findById(decoded.id);
        if (user) {
          req.user=user ;
          req.id = decoded.id
          next()
        }
        else{
          return res.status(401).json({message: "You are not authorized"})
        } 
      });
    }
  } catch (err) {
    next(err);
    console.log(err)
  }
};

const verifyCookie = async (req, res, next) => {
  try {
    const accesshToken = req.cookies.accessToken;
    console.log(req.cookies.accessToken)
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

export{verifyCookie,  verifyAuth}
