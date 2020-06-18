const Note = require('../models/note.model');

exports.create = async (req,res)=>{
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content can create"
        });
    }

    const note = new Note({
        title: req.body.title || "Untitled Nothing",
        content: req.body.content
    });

    await note.save()
    .then(data => {
        res.send(
            {
                status : 1,
                message: "succes",
                data : data
            }
        );
    }).catch( err=> {
        res.status(500).send({
            message: err.message || "Some eror"
        });
    });
};

exports.findAll = async (req,res)=>{
    await Note.find().then(notes=>{
        res.send({
            status : "succes",
            result :notes
        })
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "Some error ocured"
        })
    })
}
exports.findOne = async (req,res)=>{
    await Note.findById(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send({
            status : "succes",
            result : note
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
}
exports.update =(req,res)=>{
    if(!req.body.content){
        return res.status(404).send({
            message : "empty content"
        })
    }

    Note.fiindByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Nothing",
        content: req.body.content
    }, {new : true}).then(note => {
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note)
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message : "Id Not Found "+ req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
}

exports.delete = (req,res) =>{
    Note.findByIdAndDelete(req.params.noteId).then(result=>{
        res.send(
            {message : "deleted"}
        )
    })
}