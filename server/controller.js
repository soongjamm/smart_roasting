const axios = require('axios');
const FormData = require('form-data');


exports.Home = function (req, res) {
    res.send("Hello world")
}

exports.PostUploadImage = async function (req, res) {

    try {
        console.log("req.body: ", req.body);
        console.log("req.file: ", req.file);
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
        const { data } = postResponse;
        console.log('success?:', data['isImg'])
        if (data['isImg'] === true) {
            // 결과를 정상적으로 받았음
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