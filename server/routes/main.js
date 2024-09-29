import express from "express";
const router = express.Router();    


router.get("", (req, res) => {
    res.send("Hello World");
});
 
router.get("/test", (req, res) => {
    res.send('test')
})

router.get('/test2', (req,res)=> {
    res.send('this is test 2')
}) 
   
router.get('/test3', (req,res)=> {
    res.send('this is test 3')
}) 

export default router;