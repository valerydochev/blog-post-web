import express from "express";
import Post from "../modules/Post.js"; 

const router = express.Router();

router.get("", async (req, res) => {

    try{
        const locals = {
            title: "NodeJs Blog",
            description: "Blog page created with NodeJs, Express & MongoDb."
        }; 
        let perPage = 5;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render("index", { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        console.log(error);
    }

});
     
router.get("/post/:id", async (req, res) => {

    try{
        const locals = {
            title: "NodeJs Blog",
            description: "Blog page created with NodeJs, Express & MongoDb."
        }; 
          
        let currentPost = req.params.id;
          
        const data = await Post.findById({_id: currentPost});
        res.render("post", {locals, data});

    } catch (error) {
        console.log(error);
    }

});
  
router.post("/search", async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Blog page created with NodeJs, Express & MongoDb."
        };

        const searchTerm = req.body.searchTerm;
        
        const data = await Post.find({ $text: { $search: searchTerm } });

        res.render("search", { data, locals });
    } catch (error) {
        console.log(error);
    }
});


router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

export default router;
