import Post from "../models/post.model.js";
const createPost = async(req, res, next)=>{
    try{
      const{title, body}=req.body
      if(!title, !body){
        return next(handleError(401, "title, body required"))
      }
      const newUser = new Post({
        title,
        body
      });
      await newUser.save()
      return res.status(201).json("post creacted succesfully");
    }
    catch(err){
      next(err)
    }
  }

  const getAllPost = async(req, res, next)=>{
    try{
        const posts = await Post.find({userId: req.id})
        if(!posts) return res.status(401).json({message: "user does not have a post"})
        const{ userId, ...rest} = posts
        res.status(200).json(rest)
    }
    catch(err){
        next(err)
    }
  }
  const getPostById = async(req, res, next)=>{
    try{
        const{id} = req.params
        const uniquePost = await Post.findById(id)
        if(!uniquePost) return res.status(403).json({message: "No such post"})
        res.status(200).json(uniquePost)
    }
    catch(err){
        next(err)
        console.log(err)
    }
  }

  const updatePost = async(req, res, next)=>{
    try{
        const{id}=req.params
        const uniquePost = await Post.findById(id, {})
        if(!uniquePost) return res.status(403).json({message: "No such post"})
        if(uniquePost && uniquePost.userId == req.id){
            const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                  title: req.body.title,
                  body: req.body.body
                },
              }, {new: true})

              return res.status(200).json({message: "successful"})
        }
    }
    catch(err){
        next(err)
    }
  }
  const deletePost = async(req, res, next)=>{
    try{
        const{id}= req.params
        const availablePost  = await Post.findById(id)
        if(!availablePost){
            return res.staus(400).json({message: "No such post"})
        }
        if( availablePost && availablePost.userId == req.id){
            await Post.findByIdAndDelete(id)}
        }
          
    catch(err){
        next(err)
    }
  }
  export {createPost, getAllPost, getPostById, deletePost, updatePost}