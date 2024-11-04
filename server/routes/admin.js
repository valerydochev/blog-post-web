import express from "express";
import Post from "../modules/Post.js"; 
import User from "../modules/User.js"; 
  
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
    
  
  
export default adminRouter;