import express from "express";
const router = express.Router();    


router.get("", (req, res) => {
    const locals = {
        title: "NodeJs Blog",
        description: "Blog page created with NodeJs, Express & MongoDb."
    }

    res.render("index", { locals });
});
 
router.get("/about", (req, res) => {
    res.render('about')
});

router.get("/contact", (req, res) => {
    res.render('contact')
});

export default router;