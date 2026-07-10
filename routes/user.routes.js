const express=require("express");
const {validateUser}=require("../middlewares/user.middlewares")
const { handleCreateNewUser } = require("../controllers/user.controllers");
const router=express.Router();
//routes
router.post("/signup", validateUser, handleCreateNewUser);
module.exports=router;
