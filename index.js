const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

configureMiddlewares();
settingRoutes();
configureMongo();
configureErrorHandling();
startServer();
handleHomePage();


function configureMiddlewares() {
    app.use(bodyParser.json());
    app.use(cors());
}

function settingRoutes() {
    const petRoutes = require('./routes/pet');
    const userRoutes = require('./routes/user');
    const loginRoutes = require('./routes/login');
    const whatsappRoutes = require('./routes/whatsapp');
    const specieRoutes = require('./routes/specie');

    app.use('/api', petRoutes);
    app.use('/api', userRoutes);
    app.use('/api', loginRoutes);
    app.use('/api', whatsappRoutes);
    app.use('/api', specieRoutes);
}

function configureMongo() {
    const uri = `mongodb+srv://admin:` + process.env.Mongo_PASSWORD + 
        `@main.6lpints.mongodb.net/?retryWrites=true&w=majority&appName=Main`;

    mongoose.connect(uri);
}

function configureErrorHandling() {
    app.use(function(err, req, res, next){
        console.log(err);
        res.status(422).send({error: err.message});
    });
}

function startServer() {
    app.listen(port, () => {
        console.log('Servidor em execução na porta: ' + port);
    });
}

function handleHomePage() {
    app.get("/", function(req, res) {
        res.send('Servidor em execução na porta: '+ port);
    });
}