const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
// Route 1: GET ALL NOTES UDING GET 'api/auth/getuser' Login require
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
   } catch (error) {
        console.log(error.message)
        res.status(500).send('Intenal server error')
   }
})
// Route 2: ADD a new notes using post'api/auth/addnote' Login require
router.post('/addnote',fetchuser,[
    body('title','Enter the valid Title').isLength({min:3}),
    body('description','Description must have atlest 5 character').isLength({min:5}),
],async (req,res)=>{
    try {
        const {title,description,tag}=req.body
        // If there are error return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Note({
            title, tag, description,user:req.user.id
        })
        const savedNote = await notes.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Intenal server error')
    }
    
})
// Route 3: Update a  notes using post'api/notes/updatenote' Login require
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        const {title,description,tag}=req.body
        // Create a newNote
        const newNote ={}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        // Allow deletion only if user owns this Note
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed")
        }
        note= await Note.findByIdAndUpdate(req.params.id ,{$set:newNote},{new:true})
        res.json(note)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Intenal server error')
    }
    
})

// Route 4: Deleting a  notes using post'api/notes/deletenotes' Login require
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
        // Allow deletion only if user owns this Note
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed")
        }
        note= await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Intenal server error')
    }
    
})

module.exports = router