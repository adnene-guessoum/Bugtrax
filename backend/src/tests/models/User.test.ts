import mongoose, { ConnectOptions } from 'mongoose';
import User from '../../models/User.ts';

describe('User model', () => {
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save user successfully', async () => {
    const userData = {
      nomUtilisateur: 'Adnene',
      motDePasse: '123456',
      email: 'adnene@mail.com',
      role: 'user',
      dateCreation: new Date(),
      admin: false
    };

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.nomUtilisateur).toBe(userData.nomUtilisateur);
    expect(savedUser.motDePasse).toBe(userData.motDePasse);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe(userData.role);
    expect(savedUser.dateCreation).toBe(userData.dateCreation);
    expect(savedUser.admin).toBe(userData.admin);
  });

  it('should fail to create user with wrong data types', async () => {
    const userData: any = {
      nomUtilisateur: 123,
      motDePasse: 123,
      email: 123,
      role: 123,
      dateCreation: 123,
      admin: 123
    };

    const newUser = new User(userData);
    let err: any;

    try {
      await newUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to create user with missing required fields', async () => {
    const userData: any = {
      nomUtilisateur: 'Adnene',
      motDePasse: '123456'
    };

    const newUser = new User(userData);
    let err: any;
    try {
      await newUser.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
