const express = require('express');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const mongoose = require("mongoose");
// const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
require('dotenv').config();

// console.log(process.env); // Log all environment variables to see what's loaded

const uri = process.env.MONGO_URL;
console.log('MongoDB URI:', uri); // This should print your MongoDB URI

app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{

    app.listen(port,() =>console.log("server started at port ",port))

}).catch((err)=>console.log(err))


app.use("/users",userRouter);
app.use("/notes",noteRouter);

app.get('/',(req,res) =>{
    res.send("This is notes api");
})
