import express from "express";
import Post from "../modules/Post.js"; 
import User from "../modules/User.js"; 
import router from "./main.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

  
const adminRouter = express.Router();
  
const adminLayout = "../views/layouts/admin";
   
adminRouter.get("/admin", async (req, res) => {

    try{
        const locals = {
            title: "Admin",
            description: "Blog page created with NodeJs, Express & MongoDb."
        }; 
          
        res.render("admin/login", {locals, layout: adminLayout });

    } catch (error) {
        console.log(error);
    }

});
  
router.get("/dashboard", async (req, res) => {
    res.render("admin/dashboard");
})
  
adminRouter.post("/admin", async (req, res) => {

    try{
        
        const {username, password} = req.body;

        if (req.body.username === "admin" && req.body.password === "password" ) {
            res.send("Your are logged in");
        }else{
            res.send("Wrong username or password")
        }

    } catch (error) {
        console.log(error);
    }
});
  
router.post("/register", async(req, res) => {
    try{

        const {username, password} = req.body
          
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
          
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
          
        const newUser = new User({
            username: username,
            password: hashedPassword
        });
          
        await newUser.save();
          
        res.status(201).json({message: "Usser registarted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "An error occurred during registration"});
    }
})
  
     
export default adminRouter;