const assert = require('should');
const request = require('supertest');
const app = require('../app')

describe('GET /', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    })
})