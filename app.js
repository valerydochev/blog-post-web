import "dotenv/config";
import express from "express";
import router  from "./server/routes/main.js";
import expressLayout from "express-ejs-layouts";
import connectDB from "./server/config/db.js"; 

const app = express();
const PORT = process.env.PORT;
  
connectDB();

app.use(express.static("public"));


app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");


app.use("/", router);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}); 
    
