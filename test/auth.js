const supertest = require('supertest');
const server = require('../server');

describe('POST /auth', () => {
    let data = {
        "user": "test",
        "password": "test"
    }
    it('respond with json containing an access token', done => {
        supertest(server)
            .post('/auth')
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .expect(200, done);
    });
});