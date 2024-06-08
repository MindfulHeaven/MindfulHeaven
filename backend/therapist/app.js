const mongoose = require("mongoose");
const routes=require("./Routes/routes");
const express=require("express");
const app=express();
require("dotenv").config()
const cors = require("cors")

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        // origin: "*",
        methods: ["GET", "POST"]
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.THERAPIST_DB, {socketTimeoutMS: 30000}).then(()=>{console.log("Db connected")})
// mongoose.connect(process.env.USER_DB, {socketTimeoutMS: 30000}).then(()=>{console.log("Db connected")})

// require('../authentication/models/User')
// require('../therapist/models/therapist_model')
// require('../therapist/models/session_model')

app.use(routes);
app.listen(process.env.PORT);


// app.listen(3000, () => {
//  console.log('Server is running on port 8000');
// });
