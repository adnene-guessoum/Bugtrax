import App from '../app.ts';
import request from 'supertest';

const hostname = '0.0.0.0';
const port = 8000;
let server: any;

describe('GET /', () => {
  beforeAll(done => {
    server = App.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
      done();
    });
  });

  afterAll(done => {
    server.close(done);
  });

  it('should return 200 OK GET /', async () => {
    const response = await request(App).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world!');
  });
});
