const supertest = require('supertest');
const request = supertest('https://localhost:3000/api');

describe('GET /sagas', () => {

    it('fetches sagas json properly', done => {
        request.get('/sagas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('fetches an unique saga', done => {
        request.get('/sagas/dragon ball')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});