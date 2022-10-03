const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// ROUTE:1 Get all the notes of the user using GET : /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user : req.user.id})
        console.log(req.user)
        console.log(notes)
        res.send(notes)
    } catch (error) {
        console.log(error)
        res.status(400).send('Internal server error')
    }
})

// ROUTE:2 Add the notes of the user using POST : /api/notes/addnote
router.post('/addnote',fetchuser,
    body('title','Please enter a valid title').isLength({ min: 2 }),
    body('description').isLength({ min: 5 }),
    async(req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            const {title,description,tag} = req.body
            const addnotes = await new Notes({
                title,description,tag,user:req.user.id
            })
            const savenotes = await addnotes.save()
            res.send(savenotes)
        } catch (error) {
            console.log(error)
            res.status(400).send('Internal server error')
        }
    })

// ROUTE:3 Update the notes of the user using PUT : /api/notes/updatenote
router.put('/updatenote/:id',fetchuser,
async(req,res)=>{
    try {
        const {title,description,tag} = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Check the note for update and update it
        let updatenote = await Notes.findById(req.params.id)
        if(!updatenote){return res.status(404).send('Not found')}

       
        // If this is not the same user then we wont allow him to change the note. So nobody can hack this
        if(updatenote.user.toString() !== req.user.id){
            res.status(401).send('Not Allowed')
        }
        updatenote = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.send(updatenote)
    } catch (error) {
        console.log(error)
        res.status(400).send('Internal server error')
    }
})


// ROUTE:4 Delete the notes of the user using DELETE : /api/notes/deletenote
router.delete('/deletenote/:id',fetchuser,
async(req,res)=>{
    try {
        // Check the note for delete and delete it
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send('Not found')}

       
        // If this is not the same user then we wont allow him to change the note. So nobody can hack this
        if(note.user.toString() !== req.user.id){
            res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({Success:"Note is deleted",note:note})

    } catch (error) {
        console.log(error)
        res.status(400).send('Internal server error')
    }

})


module.exports = router 