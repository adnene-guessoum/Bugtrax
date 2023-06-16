import App from '../../app.ts';
import request from 'supertest';
import mongoose from 'mongoose';

describe('GET /', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.connection.close();
  });

  it('should return 200 OK GET /', async () => {
    const response = await request(App).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world!');
  });
});
