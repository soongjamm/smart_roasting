const axios = require('axios');
const FormData = require('form-data');
const mongoose = require('mongoose')
const Bean = require('./models/bean')
const Post = require('./models/post')
const Roasting = require('./models/roasting')
const EXTRACT_URL = 'http://localhost:5999/extraction'

async function FindRoastingInfo(roasting_level) {
    try {
        res = await Roasting.findOne({ brightness: roasting_level })
        return res;
    } catch (err) {

    }
}

exports.Home = function (req, res) {
    res.sendFile("/Users/soongjamm/smart_roasting/server/views/image_upload.html")
}

/* 사용자가 사진을 웹서버에 POST로 전송하면 분석을 위해 Flask 서버로 전달해주는 역할을 한다.
분석 결과를 리턴받으면 DB에서 로스팅 레벨에 해당하는 레코드를 불러와 전달해준다.*/
exports.PostUploadImage = async function (req, res) {
    try {
        // console.log("req.body: ", req.body);
        // console.log("req.file: ", req.file);
        const { buffer, originalname: filename } = req.file

        const formData = new FormData();
        formData.append('my_field', 'my value');
        formData.append('file', buffer, {
            filename: filename
        });

        extractResponse = await axios.post(
            EXTRACT_URL,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "Content-Length": formData.getLengthSync()
                }
            }
        )

        res.send(extractResponse.data)
        // const { data } = predictResponse;
        // // console.log('From deep-api server : ', data)
        // if (data['isImg'] === true) {
        //     // data['roasting_level']에 해당하는 로스팅 정보를 find - return.
        //     const roastingInfo = await FindRoastingInfo(data['roasting_level']);
        //     console.log(roastingInfo);
        //     res.sendStatus(200);
        //     return roastingInfo;
        // } else {
        //     console.log("not img")
        //     res.sendStatus(400);
        // }

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

// 게시글 POST
// 작성자가 로그인 되어있는지 확인 필요?  
exports.UploadPost = async function (req, res) {
    const { body: post } = req;

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

// 게시글 DELETE
// 게시자와 삭제하려는 사람이 동일한 id인지 확인해야 함

// 로스팅 정보 POST
exports.PostRoastingInfo = async function (req, res) {
    const { body: roasting } = req;

    const aRoasting = new Roasting(roasting)
    try {
        posted = await aRoasting.save()
        console.log("added to db : ", posted)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

// 로스팅 정보 PUT (내용 수정)
exports.PutRoastingInfo = async function (req, res) {

}

// 원두 정보 GET
// 원두 정보 화면 입장시 전체 정보
exports.GetBeansInfo = async function (req, res) {
}

// 원두 정보 POST
// 원두에 대한 정보를 추가
// 아직 테스트 안해봄
exports.PostsBeansInfo = async function (req, res) {
    const { body: bean } = req;
    aBean = new Bean(bean);
    try {
        posted = await aBean.save();
        console.log("added to db : ", posted)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }
}

// 특정 조건의 원두 정보 GET
exports.GetConditionalBeansInfo = async function (req, res) {

}