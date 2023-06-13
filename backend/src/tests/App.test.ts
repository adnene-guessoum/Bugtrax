import App from '../app.ts';
import request from 'supertest';

describe('GET /', () => {
  it('should return 200 OK GET /', async () => {
    const response = await request(App).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world!');
  });
});
