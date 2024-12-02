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
        res.render("admin/dashboard", { layout: adminLayout });
    } catch (error) {
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

export default adminRouter;