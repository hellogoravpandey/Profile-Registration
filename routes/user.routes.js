const express=require("express");
const {validateUser, validateUploadedFiles}=require("../middlewares/user.middlewares")
const { handleCreateNewUser } = require("../controllers/user.controllers");
const {upload}=require("../middlewares/multer.middlewares")
const router=express.Router();
//routes
router.post("/signup", 
    upload.fields([
        {name: "profilePhoto", maxCount: 1},
        {name: "profilePdf", maxCount: 1}, 
        {name: "profileVideo", maxCount:1}
        ]), validateUploadedFiles, validateUser, handleCreateNewUser);
module.exports=router;
