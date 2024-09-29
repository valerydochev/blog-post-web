import express from "express";
const router = express.Router();    


router.get("", (req, res) => {
    res.send("Hello World");
});
 
router.get("/test", (req, res) => {
    res.send('test')
})

export default router;