const User=require("../models/user.models");

async function handleCreateNewUser(req, res){
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
      password: req.body.password
  });
  return res.status(201).json({"msg": "user created successfully"});
}


module.exports={handleCreateNewUser};