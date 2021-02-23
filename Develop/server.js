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
    res.redirect('notes.html')
    console.log(savedNotes)
});



app.listen(PORT, () => {
    console.log('Server is running', PORT)
})