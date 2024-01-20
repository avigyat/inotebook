const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/User');

//Route 1 Get all the notes for logged in user.Login RQD
router.get('/fetchNotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.send(notes);
})

//Route 2 addNotes for logged in user.Login RQD
router.post('/addNotes', fetchUser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Enter a valid description').isLength({ min: 6 }),
    ], async (req, res) => {
        const errors = validationResult(req);
        //check for validation errors
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) };
        try {

            const { title, description, tag } = req.body;

            const note = new Notes({
                title, description, tag, user: req.user.id

            })
            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured")
        }

    })

//Route 2 updateNotes for logged in user.Login RQD
router.put('/updateNotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find note tobe updated and update it
    console.log("from params" + req.params.id);
    let note = await Notes.findById(req.params.id);
    console.log(note);
    if (!note) { return res.status(404).send("Not found") }
    console.log(note);
    console.log("from params" + req.params.id);

    if (note.user.toString() !== req.user.id) { return res.status(404).send("Id does not match") }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ note })
})

//Route 3 deleteNotes for logged in user.Login RQD
router.delete('/deleteNotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    //find note tobe updated and update it
    console.log("from params" + req.params.id);
    let note = await Notes.findById(req.params.id);
    console.log(note);
    if (!note) { return res.status(404).send("Not found") }
    console.log(note);
    console.log("from params" + req.params.id);

    if (note.user.toString() !== req.user.id) { return res.status(404).send("Id does not match") }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.send( "Note deleted" )
})


module.exports = router