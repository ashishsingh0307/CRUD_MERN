const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//SCHEMA
const schemaData = mongoose.Schema({
    name : String,
    email: String,
    mobile: Number
},{
    timestamps: true
});

const userModel = mongoose.model("users", schemaData);

// READ
app.get("/", async(req, res)=>{
    const data = await userModel.find({})
    res.json({success : true, data : data});
});

// CREATE
app.post("/create", async(req, res)=>{
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({success : true, message : "data save successfully", data : data});
});

// UPDATE
app.put("/update", async(req, res)=>{
    console.log(req.body);
    const {id, ...rest} = req.body;
    console.log(rest)
    const data = await userModel.updateOne({ _id : req.body.id},rest)
    res.send({success : true, message : "data updated successflly", data : data})
});


mongoose.connect("mongodb+srv://singhashish041:fA2b37sW6NNzrTTb@cluster0.hq3ip2y.mongodb.net/crudoperation")
.then(()=>{
    console.log("Connected to DB");
    app.listen(PORT,()=>console.log("Server is Running CRUD"));
})
.catch((err)=>console.log(err));
