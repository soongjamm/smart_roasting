require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 9999;
const { Home, GetUploadImage, PostUploadImage } = require('./controller')
const multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

function InitServer() {
    Routing();
    app.set('view engine', 'html')
    app.use(express.static('Views'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    mongoose.Promise = global.Promise; // node.js native promise 사용

    // mongoDB connection
    // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    //     .then(() => console.log('Successfully connected to mongodb'))
    //     .catch(e => console.error(e));


    app.listen(port, () => {
        console.log('node.js server is running now. PORT : ', port)
    })
};

function Routing() {
    app.get('/', Home)
    app.post('/UploadImage', upload.single('img'), PostUploadImage)
};

InitServer();

module.exports = app;