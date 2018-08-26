const Note = require('../models/note.model');

exports.create = (req,res)=>{
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content can create"
        });
    }

    const note = new Note({
        title: req.body.title || "Untitled Nothing",
        content: req.body.content
    });

    note.save()
    .then(data => {
        res.send(data);
    }).catch( err=> {
        res.status(500).send({
            message: err.message || "Some eror"
        });
    });
};