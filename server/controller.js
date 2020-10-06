const axios = require('axios');
const FormData = require('form-data');
const mongoose = require('mongoose')
const Post = require('./models/post')

exports.Home = function (req, res) {
    res.send("Hello world")
    return "hi"
}

exports.PostUploadImage = async function (req, res) {
    try {
        // console.log("req.body: ", req.body);
        // console.log("req.file: ", req.file);
        const formData = new FormData();
        formData.append('my_field', 'my value');
        formData.append('my_image', req.file.buffer, {
            filename: req.file.originalname
        });

        postResponse = await axios.post(
            'http://localhost:5000/predict',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "Content-Length": formData.getLengthSync()
                }
            }
        )

        // data를 hash해서 db에 저장... 구현해야 함
        const { data } = postResponse;
        console.log('From deep-api server : ', data)
        if (data['isImg'] === true) {
            // data['roasting_level']에 해당하는 로스팅 정보를 find - return.
            // 현재 db에 로스팅 레벨 정보 없음. 추가해야 함.
            res.sendStatus(200);
        } else {
            console.log("not img")
            res.sendStatus(400);
        }


    } catch (err) {
        res
            .status(500)
            .send(`${err}`);
    }

}

exports.GetPostAll = function (req, res) {
    Post.find({}).exec(function (err, arrp) {
        console.log(arrp) // 모든 게시글 콘솔에 출력
        res.sendStatus(200)
        return arrp;
    });
}

// 특정 게시글 get
exports.GetAPost = function (req, res) {
    const { id: postId } = req.params;
    Post.find({ '_id': postId }).exec(function (err, post) {
        console.log("find a post result : ", post)
        res.sendStatus(200)
        return post;
    })
}

// 게시글 post
exports.UploadPost = async function (req, res) {
    const { body: post } = req

    const aPost = new Post(post)
    try {
        posted = await aPost.save()
        console.log("added to db : ", posted)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
