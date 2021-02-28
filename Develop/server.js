const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('node-uuid');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

// Sends server notelist request
app.get('/api/notes', (req, res)=>{
    res.send(noteList)
});

// Sends saved newly saved notes to server to be saved
app.post('/api/notes', (req, res)=>{
    let savedNotes = req.body
    console.log(req.body)
    savedNotes.id=uuid();
    noteList.push(savedNotes)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    console.log(noteList)
    res.json(noteList)
});

// Sends a delete request to remove a saved note
app.delete(`/api/notes/:id`, (req, res)=>{
    const removal = req.params.id;
    noteList = noteList.filter(item => item.id !== removal)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    res.end('deleted')
});

app.listen(PORT, () => {
    console.log('Server is running', PORT)
});