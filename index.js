const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const app = express();

async function ConnectToDb (){
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        return console.log("succesfully Connected Db");
    } catch (error) {
        console.log(error);
    }
}
ConnectToDb ();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3001");
});















