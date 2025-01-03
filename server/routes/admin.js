import express from "express";
import Post from "../modules/Post.js"; 
import User from "../modules/User.js"; 
import router from "./main.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

  
const adminRouter = express.Router();
const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;
  
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
  
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
  
adminRouter.get("/dashboard", authenticateToken, async (req, res) => {
    try {
           
        const locals = {
            title: "Dashboard",
            description: "Blog page created with NodeJs, Express & MongoDb."
        }; 

        const data = await Post.find();
        res.render("admin/dashboard", { 
            locals,
            data,
            layout: adminLayout 
        });
    } catch (error) {
        console.log(error);
    }
});
  
adminRouter.get("/add-post", authenticateToken, async (req, res) => {
    try {
           
        const locals = {
            title: "Add Post",
            description: "Blog page created with NodeJs, Express & MongoDb."
        }; 

        const data = await Post.find();
        res.render("admin/add-post", { 
            locals,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
});  
  
adminRouter.post("/add-post", authenticateToken, async (req, res) => {
    try { 
        try {
              
            const { title, body } = req.body;
              
            if (!title || !body) {
                console.log("Validation failed: Missing title or body.");
                return res.status(400).json({ message: "Title and body are required" });
            }

            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
              
            await Post.create(newPost);
            res.redirect("/dashboard")
            
        } catch (error) {
            console.log(error);         
        }
    } catch (error) {
        console.log(error);
    }
});  

adminRouter.put("/edit-post/:id", authenticateToken, async (req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
          
        res.redirect(`/edit-post/${req.params.id}`);

    }catch {
        console.log(error);
    }
});


adminRouter.get("/edit-post/:id", authenticateToken, async (req, res) => {
    try {

        const locals = {
            title: "Edit Post",
            description: "Free NodeJs User Management System"
        }; 

        const data = await Post.findOne({_id: req.params.id});
          
        res.render("admin/edit-post", {
            locals,
            data,
            layout: adminLayout
        });

    }catch {
        console.log(error);
    }
});

adminRouter.post("/admin", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});


adminRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

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

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});     
    
router.delete("/delete-post/:id", authenticateToken, async (req, res) =>{
    try {
        await Post.deleteOne({_id: req.params.id})
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
    }
})
  
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});

export default adminRouter;