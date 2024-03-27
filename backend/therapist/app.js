const mongoose = require("mongoose");
const routes=require("./Routes/routes");
const express=require("express");
const app=express();
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection=mongoose.connect(process.env.THERAPIST_DB)

app.use(routes);
app.listen(process.env.PORT);