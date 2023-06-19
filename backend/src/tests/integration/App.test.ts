import App from '../../app.ts';
import request from 'supertest';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import User from '../../models/user.ts';

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

describe('Login et Register API', () => {
  beforeAll(async () => {
    await mongoose
      .connect(
        'mongodb://admin-user:admin-password@localhost:27017/test-database?authSource=admin',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        } as ConnectOptions
      )
      .then(() => console.log('Connected to MongoDB test database...'))
      .catch(err => console.log(err));
  });

  afterAll(async () => {
    await User.deleteMany({});
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  //register test before login test or add a user in db
  it('should register a user and return token', async () => {
    const response = await request(App).post('/api/users/register').send({
      username: 'test',
      email: 'example@example.com',
      password: '123456'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should login a user and return token', async () => {
    const response = await request(App).post('/api/users/login').send({
      email: 'example@example.com',
      password: '123456'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login a user with wrong password', async () => {
    const response = await request(App).post('/api/users/login').send({
      email: 'example@example.com',
      password: '1234567'
    });

    expect(response.status).toBe(400);
  });
});
