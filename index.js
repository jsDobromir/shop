const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    let file = fs.createReadStream(path.join(__dirname, 'index.html'));
    res.status(200);
    file.pipe(res);
});

app.get('/kozmetika', (req, res) => {
    let file = fs.createReadStream(path.join(__dirname, 'category.html'));
    res.status(200);
    file.pipe(res);
});

app.listen(9000, () => {
    console.log('Listen on port 9000');
});