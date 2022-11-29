const userModel = require('../models/userModel');
const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create json web token
const tokenTime = 3 * 24 * 60 * 60; 

const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: tokenTime
    });
};

const signUp = async (req, res) => {
    const { email,password,firstName,lastName,username,userType} = req.body;
    const usernameFound = await userModel.findOne({username: username})
    const emailFound = await userModel.findOne({email:email})
    if(usernameFound)
    {
        res.status(404).json({error: "Username is taken"})
    }
    else if(emailFound){
        res.status(404).json({error: "Email is already used"})
    }
    else{
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({ email: email, password: hashedPassword,firstName: firstName,lastName:lastName,username:username,userType:userType });
        const token = createToken(user.username);

        res.cookie('jwt', token, { httpOnly: true, tokenTime: tokenTime * 1000 });
        res.status(200).json(user)
    } 
    catch (error) {
    res.status(400).json({ error: error.message })
    }
    }
    
}

const login = async (req, res) => {
   
    const {username,password}= req.body;
    const user = await userModel.findOne({username:username})
    if(user){
        const hashedpass= user.password
        const correct = await bcrypt.compare(password,hashedpass)
        if(correct){
            const token = createToken(user.username);
            res.cookie('jwt', token, { httpOnly: true, tokenTime: tokenTime * 1000 });
            res.status(200).json({mssg:"Logged In Successfully"});
        }
        else{
            res.status(400).json({error: "Password is incorrect"});
        }
    }
    else{
        res.status(400).json({error: "Username is not found"});
    }
}

const logout = async (req, res) => {
    
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({mssg:"Logged Out Successfully"});
}



module.exports ={
    signUp,
    login,
    logout
}