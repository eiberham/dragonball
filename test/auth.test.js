const supertest = require('supertest');
const request = supertest('https://localhost:3000/api');

describe('POST /auth', () => {

    it('authenticates ok', done => {
        let body = 'user=test&password=test';
        request.post('/auth')
            .send(body)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('throws unauthorized', done => {
        let body = 'user=fake&password=fake';
        request.post('/auth')
            .send(body)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
});