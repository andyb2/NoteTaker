const express = require('express');
const app = express();
const fs = require('fs')
const uuid = require('node-uuid')
const PORT = process.env.PORT || 5000;


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());


let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));