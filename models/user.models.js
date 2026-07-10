const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true  
    },
    secondName: {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User=mongoose.model("users", userSchema);
// exporting
module.exports=User;