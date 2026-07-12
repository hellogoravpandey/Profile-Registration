const User=require("../models/user.models");
const {ConflictError}=require("../middlewares/error.middlewares")
async function handleCreateNewUser(req, res){
  try {
    const result=await User.create({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
    profilePhoto: req.files.profilePhoto[0].filename,
    profilePdf: req.files.profilePdf[0].filename,
    profileVideo: req.files.profileVideo[0].filename,
    });
  } catch (error) {
    if(error.code===11000){
       throw new ConflictError("Email already exist");
    }
  }
  return res.status(201).json({"msg": "user created successfully"});
}



module.exports={handleCreateNewUser};