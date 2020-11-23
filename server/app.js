require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 9999;
const { Home, PostUploadImage, GetPostAll, GetAPost, UploadPost, PostRoastingInfo, PutRoastingInfo } = require('./controller')
const multer = require('multer')
const logger = require('morgan')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

function InitServer() {
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // mongoose.Promise = global.Promise; // node.js native promise 사용

    // // mongoDB connection
    // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    //     .then(() => console.log('Successfully connected to mongodb'))
    //     .catch(e => console.error(e));


    Routing();
    app.listen(port, () => {
        console.log('node.js server is running now. PORT : ', port)
    })
};

function Routing() {
    app.get('/', Home);
    app.post('/UploadImage', upload.single('file'), PostUploadImage);
    app.get('/GetPost', GetPostAll);
    app.get('/GetPost/:id', GetAPost)
    app.post('/UploadPost', UploadPost);
    app.post('/RoastingInfo', PostRoastingInfo);
    app.put("/RoastingInfo", PutRoastingInfo);
};

InitServer();

module.exports = app;