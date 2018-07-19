const express = require('express');
const app = express();
const multerConfig = require('./config/multerConfig');

const upload = multerConfig(/jpg|jpeg|png|pdf|csv/);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.render('upload.hbs', {
    filename: req.file.originalname,
    link: req.file.location
  });
});

module.exports = app;
