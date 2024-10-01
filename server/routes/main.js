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
})

router.get('/test2', (req,res)=> {
    res.send('this is test 2')
}) 
   
router.get('/test3', (req,res)=> {
    res.send('this is test 3')
}) 

export default router;