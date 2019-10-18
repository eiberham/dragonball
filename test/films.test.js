const supertest = require('supertest');
const request = supertest('https://localhost:3000/api');

describe('GET /films', () => {

    it('fetches films json properly', done => {
        request.get('/films')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('fetches an unique film', done => {
        request.get('/films/broly')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});