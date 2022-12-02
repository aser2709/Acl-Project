const express = require("express");
const router = express.Router();
const adminmodel = require('../models/adminModel');
const instructormodel = require('../models/instructorModel');
const corporatetraineemodel = require('../models/corporatetraineeModel');

router.post("/addadmin", async (req,res) =>{
    const allAdmins = await adminmodel.find({});
    var adminExists = false;
    allAdmins.forEach(currentAdmin => {
        if(req.body.Username == currentAdmin.Username){
            adminExists = true;
        }
    });
    if(adminExists){
        res.send("username already exists");
    }else{
        const admin = new adminmodel(req.body);
        await admin.save();
        res.send("Created");
    }
});
router.post("/addinstructor", async (req,res) =>{
    const allInstructor = await instructormodel.find({});
    var instructorExists = false;
    allInstructor.forEach(currentInstructor => {
        if(req.body.Username == currentInstructor.Username){
            instructorExists = true;
        }
    });
    if(instructorExists){
        res.send("username already exists");
    }else{
        const instructor = new instructormodel(req.body);
        await instructor.save();
        res.send("Created");
    }
});
router.post("/addcorporatetrainee", async (req,res) =>{
    const allcorporatetrainee = await corporatetraineemodel.find({});
    var corporatetraineeExists = false;
    allcorporateTrainee.forEach(currentcorporateTrainee => {
        if(req.body.Username == currentcorporateTrainee.Username){
            corporatetraineeExists = true;
        }
    });
    if(corporatetraineeExists){
        res.send("username already exists");
    }else{
        const corporatetrainee = new corporatetraineemodel(req.body);
        await corporatetrainee.save();
        res.send("Created");
    }
});


module.exports = router;