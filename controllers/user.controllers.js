const User=require("../models/user.models");

async function handleCreateNewUser(req, res){
 console.log(`file: ${req.file}`);
//Duplicate email check
 const userWithSameEmail=await User.find({email: req.body.email});
 console.log("same email user", userWithSameEmail);
 if(userWithSameEmail.length!=0){
    return res.status(409).json({"msg": "Email already exists"});
 }
 //unique email=> then create new user
  const result=await User.create({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      email: req.body.email,
      password: req.body.password,
      profilephoto: req.files.profilePhoto[0].filename,
      profilePdf: req.files.profilePdf[0].filename,
      profileVideo: req.files.profileVideo[0].filename,
  });
  return res.status(201).json({"msg": "user created successfully"});
}


module.exports={handleCreateNewUser};