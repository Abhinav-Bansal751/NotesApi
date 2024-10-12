const express = require('express');
const noteModel = require('../models/note')
const mongoose = require('mongoose');


const createNote = async(req,res) =>{
    const { userId } = req;
    const { title,description } = req.body;

    const newNote = new noteModel({
        title,
        description,
        userId
    })
    try {
        await newNote.save();
        return res.json(newNote).status(201);
        

    } catch (error) {
        console.log(error);
        return res.send("error occured in note creation").status(500);
    }
    console.log("note created successfully")
}
const updateNote =async(req,res) =>{

    const id = req.params.id;
    const { title,description } = req.body;

    const newNote ={
        title,
        description,
        userId:req.userId
    }

    try {

        await noteModel.findByIdAndUpdate(id,newNote,{ new : true });
        res.status(200).json(newNote)
        
    } catch (error) {
        console.log(error);
        return res.send("error occured in updating note").status(500);
    
    }




}
const deleteNote = async(req,res) =>{

    const {id} = req.params.id;

    try {
        const note = await noteModel.findByIdAndDelete(id);
        console.log(note);
        return res.status(202).json(note);
        

    } catch (error) {
        console.log(error);
        return res.send("error occured in deleting note").status(500);
   
    }

}
const getNote = async (req,res) =>{

    // const {userId} = req.userId;

    try {
        const notes = await noteModel.find({userId:req.userId});
        return res.status(200).json(notes);

    } catch (error) {

        console.log(error);
        return res.send("error occured in getting note").status(500);
    
    }
}

module.exports ={
    createNote,
    updateNote,
    getNote,
    deleteNote
}