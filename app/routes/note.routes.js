module.exports=(app)=>{
    const notes=require('../controllers/note.controller');

    app.post('/notes',notes.create);
}