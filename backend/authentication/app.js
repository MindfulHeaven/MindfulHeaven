const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config()
// const URL = "mongodb+srv://Karan:karan%409809@cluster0.t4qkxgn.mongodb.net/"
const cors = require("cors")


//loading and using middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connection to data base
mongoose.connect(process.env.DATABASE_URL || URL).then(() => console.log('Db connected')).catch((e) => console.error(e));

app.use(authRoutes);
app.listen(process.env.PORT);