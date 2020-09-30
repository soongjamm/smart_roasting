const axios = require('axios')

exports.Home = function (req, res) {
    res.send("Hello world")
}

exports.PostUploadImage = async function (req, res) {
    console.log("req.body: ", req.body);
    console.log("req.fiie: ", req.file);
    response = await axios.post('http://localhost:5000/predict', {
        params: {
            foo: 'bar'
        }
    })
    console.log(response)
    res.sendStatus(200);

}