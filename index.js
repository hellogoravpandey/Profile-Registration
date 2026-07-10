require("dotenv").config();
const express=require("express");
const {connectToMongoDB}=require("./connection");
const userRoutes=require("./routes/user.routes");
const { validateUser } = require("./middlewares/user.middlewares");
const app=express();
//mongodb connection
connectToMongoDB(process.env.MONGODB_URL)
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log("error connecting to MongoDB")});
//middleware
app.use(express.urlencoded({extended: false}));

//routes
app.use("/user",userRoutes);
//server listen for requests 
app.listen(process.env.PORT, (err)=>{
    if(!err) {console.log(`server started at ${process.env.PORT}`)};
});