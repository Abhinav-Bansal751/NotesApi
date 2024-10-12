const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouter = express.Router();




noteRouter.get("/",authMiddleware,getNote);

noteRouter.post("/",authMiddleware,createNote);

noteRouter.delete('/:id',authMiddleware,deleteNote);
noteRouter.put('/:id',authMiddleware,updateNote);

module.exports = noteRouter;