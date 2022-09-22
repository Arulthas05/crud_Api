const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors =require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cruddb").then((db) => {
    console.log("db connect");
})
    .catch((err) => {
        console.log(err);
    })

const sch = {
    StudentId: Number,
    StudentName: String,
    ChemistryMarks: Number,
    PhysicsMarks: Number,
    BiologyMarks: Number
}
const monmodel = mongoose.model("POST1", sch);

app.post("/post", async (req, res) => {
    console.log("inside post function");

    const data = new monmodel({
        StudentId: req.body.StudentId,
        StudentName: req.body.StudentName,
        ChemistryMarks: req.body.ChemistryMarks,
        PhysicsMarks: req.body.PhysicsMarks,
        BiologyMarks: req.body.BiologyMarks

    });
    const val = await data.save();
    res.send(val);
})

app.put("/update/:StudentId", async (req, res) => {
    let upStudentId = req.params.StudentId;
    let upStudentName = req.body.StudentName;
    let upChemistryMarks = req.body.ChemistryMarks;
    let upPhysicsMarks = req.body.PhysicsMarks;
    let upBiologyMarks = req.body.BiologyMarks;

    monmodel.findOneAndUpdate({ StudentId: upStudentId }, { $set: { StudentName: upStudentName, ChemistryMarks: upChemistryMarks, PhysicsMarks: upPhysicsMarks, BiologyMarks: upBiologyMarks } },
        { new: true }, (err, data) => {
            if (err) {
                res.send("Error")
            } else {
                if (data == null) {
                    res.send("nothing found")
                } else {
                    res.send(data)
                }
            }

        })
})

app.get('/fetch/:StudentId',function(req,res){
    fetchStudentId=req.params.StudentId;
    monmodel.find(({StudentId:fetchStudentId}),function(err,val){
        if(err)
        {
            res.send(Errorr)
        }else{
            if(val.length==0)
            {
                res.send("data does not exits")
            }else{
                res.send(val);
            }
        }
    })
})

app.get("/fulldata",(req,res)=>{
    monmodel.find((err,val)=>{
        if(err){
            console.log(err)
        }else{
            res.json(val)
        }
    })
})


app.delete('/del/:StudentId',function(req,res){
    let delStudentId=req.params.StudentId;
    monmodel.findOneAndDelete(({StudentId:delStudentId}),function(err,does){
        if(err)
        {
            res.send("Errorr")
        }
        else{
            if(does==null)
            {
                res.send("wrong id")
            }
            else
            {
                res.send("deleted");
            }
        }
    })
})

app.listen(3004, () => {
    console.log("on port 3080");
})