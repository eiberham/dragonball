/* process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;  */

const supertest = require('supertest');
const request = supertest('https://localhost:3000/api');

describe('POST /auth', () => {
    let data = 'user=acedeno&password=9b5Pt23wnI';

    it('respond with json containing an access token', done => {
        request.post('/auth')
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});