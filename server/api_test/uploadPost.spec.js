const app = require("../app");
const request = require("supertest");
const should = require('should')

describe("POST /UploadPost", () => {
    it("it should add a post to mongoDB", (done) => {
        var post = {
            title: 'Test title',
            content: 'Test Content',
            author: 'Test man',
        }
        request(app)
            .post("/UploadPost")
            .send(post)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    })
})