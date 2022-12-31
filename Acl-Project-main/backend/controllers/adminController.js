const express = require("express");
const router = express.Router();
const adminmodel = require('../models/adminModel');
const userModel = require('../models/userModel');

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
router.post("/adduser", async (req,res) =>{
    const allUser = await userModel.find({});
    var userExists = false;
    allUser.forEach(currentUser => {
        if(req.body.username == currentUser.username){
            userExists = true;
        }
    });
    if(userExists){
        res.send("username already exists");
    }else{
        const user = new userModel(req.body);
        await user.save();
        res.send("Created");
    }
});
router.post("/search", async (req, res) => {
    console.log("from backend");
    console.log(req.body);
    await Flight.find(req.body)
      .then((result) => {
        res.send(result);
        console.log("Filtered");
      })
      .catch((err) => {
        console.log(err);
      });
  });


module.exports = router;