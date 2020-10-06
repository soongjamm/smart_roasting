const app = require('../app')
const request = require('supertest')

describe('GET /GetPost', () => {
    it("should get all posts data", (done) => {
        request(app)
            .get('/GetPost')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(res.body)
                done();
            })
    })

    it("should get a specific post data by postID", (done) => {
        request(app)
            .get('/GetPost/5f7cac048129236e5db9839f')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                done();
            })
    })
})