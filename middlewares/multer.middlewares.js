const multer=require("multer");
const path=require("path");
const { BadRequestError } = require("./error.middlewares");
const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "assets/uploads");
    },
    filename: function(req, file, cb){
        console.log("uploaded filename", file.filename, file.originalname);
        console.log("file:: ",file);
        const uniqueName=`${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    } 
});

function fileFilter(req, file, cb){
    if(file.fieldname=='profilePhoto'){
         if(file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
             return cb(null, true);
         }
         return cb(new BadRequestError("Profile Image must either be png or jpeg"));
    }
    else if(file.fieldname=='profilePdf'){
            if(file.mimetype=="application/pdf"){
                return cb(null, true);
            }
            return cb(new BadRequestError("Profile pdf must be pdf"));
    }
    else if(file.fieldname=='profileVideo'){
        if(file.mimetype=="application/pdf"){
            return cb(null, true);
        }
         return cb(new BadRequestError("Profile video must be pdf"));
    }
    return cb(new BadRequestError("Unexpected fieldname"));
}

const upload=multer({storage, fileFilter});
module.exports={upload};