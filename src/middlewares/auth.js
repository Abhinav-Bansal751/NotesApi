const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const authMiddleware = async(req,res,next)=>{

    try {
        
        let token = req.headers.authorization;
    
        if( !token ) {
            return res.status(401).send("Unauthorized user");
        }

        else{

            token = token.split(" ")[1];
            
            const user = await jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized user");
    }
    
    next();
}

module.exports = authMiddleware;