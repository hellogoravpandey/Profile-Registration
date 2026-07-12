const {InternalError}=require("./error.middlewares");

function respondError(error, req, res, next){
    console.log("value of error ", error);
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