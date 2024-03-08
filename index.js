const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/pet');

const app = express();
const port = 5000;
const uri = `mongodb+srv://admin:5rQqCEhN4gEWlTCf@main.6lpints.mongodb.net/?retryWrites=true&w=majority&appName=Main`;

mongoose.connect(uri);

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(port, () => {
    console.log('Servidor em execução na porta: '+ port);
});

app.get("/", function(req, res) {
    res.send('Servidor em execução na porta: '+ port);
});