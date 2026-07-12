const { cleanupFiles } = require("../utils/cleanupFiles.utils");
const {InternalError}=require("./error.middlewares");

async function respondError(error, req, res, next){
    console.log("value of error ", error);
    //delete temp files as error occurred
    await cleanupFiles(req);
    if(!error.status){
        const err=new InternalError("Some internal error");
        return res.status(err.status).json({
        "code": err.code,
        "error": err.message,
        "status": err.status,
        })
    }
    return res.status(error.status).json(
        {
        "code": error.code,
        "error": error.message,
        "status": error.status,
        }
    );
};

module.exports={respondError};