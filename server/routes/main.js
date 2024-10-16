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

  


// async function insertPostData() {
//     try {
//         await Post.insertMany([ 
//             {
//                 title: "Building a blog",
//                 body: "This is the body text"
//             },
//             {
//                 title: "Weather",
//                 body: "Today is a sunny day"
//             },
//             {
//                 title: "Cars",
//                 body: "I have a new car"
//             },
//             {
//                 title: "House",
//                 body: "I want to buy a house"
//             },
//             {
//                 title: "Daily",
//                 body: "I will go for a coffee. Who wants to come with me?"
//             },
//             {
//                 title: "Study",
//                 body: "Help me with the task, please."
//             },
//             {
//                 title: "Gym",
//                 body: "Today is chest day"
//             },
//             {
//                 title: "Work",
//                 body: "I am looking for a job"
//             },
//         ]);
//     } catch (error) {
//         console.error("Error inserting post data:", error);
//     }
// }

// insertPostData();

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

export default router;
