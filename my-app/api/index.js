const express = require("express");
const app = express();
const dotenv =require("dotenv");
const mongoose =require("mongoose");
const authRoute=require("./Routes/auth");
const userRoute=require("./Routes/user");
const postRoute=require("./Routes/post");
const categoryRoute=require("./Routes/categories");
const multer= require("multer");
const path = require("path");
 
dotenv.config();
app.use(express.json());
app.use ("/images",express.static(path.join(__dirname,"/images")))


main().catch(err => console.log(err));
main().then(console.log("MongoDB is connected!!!"))
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})

const upload= multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
  res.status(200).json("File is uploaded !!!");
})



app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);



app.listen("8000",()=>{
    console.log("Backed is running!!")
});