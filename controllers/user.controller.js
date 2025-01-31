import handleError from "../middleware/error.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const createUser = async(req, res, next)=>{
  try{
    const{username, email, password}=req.body
    if(!username, !email, !password){
      return next(handleError(401, "username, mail and password required"))
    }
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save()
    return res.status(201).json("User account creacted succesfully");
  }
  catch(err){
    next(err)
  }
}

const getAuser = async(req, res, next)=>{
  try{
    console.log(req.params.id)
    const isAuser = await User.findById(req.params.id)
    if(!isAuser) return next(handleError(403, "Such user does not exixst"))
    const{password, ...rest} = isAuser._doc
    return res.status(200).json(rest)
  }
  catch(err){
    next(err)
  }
}


const deleteUser = async (req, res, next) => {
  try {
    if(!req.body.email || !req.body.password ) return next(handleError(400, "email or password cammot be emty"))
    if (req.id != req.params.id) return next(handleError(401, "You can only delete your own account"));
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json({message: "Account deleted successfully"})
  } catch (err) {
    next(err);
  }
}

const updateUser = async(req, res, next)=>{
  try{
    if (req.id != req.params.id)
      return next(handleError(401, "You can only update your own account"));
    let updatedHashedPassword;

    if(!req.body.password){
      updatedHashedPassword = await User.findById(req.params._id).password;
    } 
    else {
      updatedHashedPassword = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        mail: req.body.mail,
        password: updatedHashedPassword,
        userName: req.body.userName,
      },
    }, {new: true});
    const{password,...rest} = updateUser._doc
    return res.status(200).json(rest)
  }
  catch(err){
    next(err)
  }
}

export {createUser,deleteUser, getAuser, updateUser};