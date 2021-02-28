const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('node-uuid')
const PORT = process.env.PORT || 5000;


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());


let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

app.get('/api/notes', (req, res)=>{
    res.send(noteList)
});

app.post('/api/notes', (req, res)=>{
    let savedNotes = req.body
    console.log(req.body)
    savedNotes.id=uuid();
    noteList.push(savedNotes)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    console.log(noteList)
    res.json(noteList)
});

app.delete(`/api/notes/:id`, (req, res)=>{
    const removal = req.params.id;
    noteList = noteList.filter(item => item.id !== removal)
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    res.end('deleted')
})

app.listen(PORT, () => {
    console.log('Server is running', PORT)
})