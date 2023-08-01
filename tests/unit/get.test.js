// tests/unit/get.test.js

const request = require('supertest');
const { readFragment } = require('../../src/model/data');

const app = require('../../src/app');

describe('GET /v1/fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  test('authenticated users get a fragments array', async () => {
    const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  test('authenticated users are getting an array of fragment ids (without expand)', async () => {
    const requestResult = await request(app)
      .post('/v1/fragments')
      .send('this is a fragment')
      .set('Content-type', 'text/plain')
      .auth('user1@email.com', 'password1');

    const fragment = await readFragment(
      requestResult.body.fragment.ownerId,
      requestResult.body.fragment.id
    );

    const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(typeof res.body.fragments[0]).toBe('string');
    expect(res.body.fragments[0]).toBe(fragment.id);
  });

  test('authenticated users are getting an array of fragment metadata (with expand)', async () => {
    await request(app)
      .post('/v1/fragments')
      .send('this is a fragment')
      .set('Content-type', 'text/plain')
      .auth('user1@email.com', 'password1');

    const res = await request(app)
      .get('/v1/fragments?expand=1')
      .auth('user1@email.com', 'password1');
    expect(typeof res.body.fragments[0]).toBe('object');
  });
});
