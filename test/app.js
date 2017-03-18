const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});

describe('GET /config', function() {
  it('should redirect 302', function(done) {
    request(app)
      .get('/config')
      .expect(302, done);
  });
});

describe('GET /status', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/status')
      .expect(200, done);
  });
});