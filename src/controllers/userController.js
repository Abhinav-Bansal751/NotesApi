const userModel = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY =process.env.SECRET_KEY;




const signup = async(req,res) =>{
    // here we need to store the user
    //so db operations  will be used and these operations r asynchronous in nature so we need to await them 
    const { email,username,password } = req.body;

    try {
        //first we will check if user exist in pour database or not
        //hash password
        // User Create n token generation

        const existingUser = await userModel.findOne({ email : email });
        

        if( existingUser ){
          return res.status(200).json({ message : "User already exist" });
        }

        const hashedPassword = await bcrypt.hash( password , 10);

        //now creating user object to store it in db

        const result = await userModel.create({
            username:username,
            email:email,
            password:hashedPassword,
        })

        const token = jwt.sign({
            email:result.email,
            id: result._id
                },SECRET_KEY)
        res.status(200).json({user : result, token: token})
        
    } catch (error) {
        console.log(error);
        res.status(500).send("some error occured");
        
        
    }
    
    
    
};


const signin = async (req,res) =>{
    const { email, password } = req.body;
    
    try {
        const existingUser = await userModel.findOne({email});
        
        if( !existingUser ) return res.send("user not found").status(404);
        
        const matchPassword  = await bcrypt.compare( password, existingUser.password);
        
        if( !matchPassword ) return res.status(400).json({message:"Invalid password"})
            
            const token = jwt.sign({
                email:existingUser.email,
                id: existingUser._id
                    },SECRET_KEY)
            res.status(200).json({user : existingUser, token: token});

    } catch (error) {
        console.log(error);
        res.send("error occured").status(500);
    }
    //

};

module.exports = { signup, signin };

