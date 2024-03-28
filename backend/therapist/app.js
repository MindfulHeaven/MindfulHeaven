const mongoose = require("mongoose");
const routes=require("./Routes/routes");
const express=require("express");
const app=express();
require("dotenv").config()
const cors = require("cors")

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection=mongoose.connect(process.env.THERAPIST_DB)

app.use(routes);
app.listen(process.env.PORT);


app.listen(3000, () => {
 console.log('Server is running on port 8000');
});
