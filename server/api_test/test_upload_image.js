const app = require("../app");
const request = require("supertest");
const path = require("path");

describe("Image upload test", () => {
    it("should pass", (done) => {
        request(app)
            .post("/UploadImage")
            .field("Content-Type", "multipart/form-data")
            .attach("img", path.resolve(__dirname, "test_image.jpeg"))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(__dirname)
                    throw err;
                }
                done();
            });
    });
});