/* process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;  */

const supertest = require('supertest');
const request = supertest('https://localhost:3000/api');

describe('GET /characters', () => {

    it('fetches characters json properly', done => {
        request.get('/characters')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});