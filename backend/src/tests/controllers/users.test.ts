import User from '../../models/user.ts';
import {
  /*
		 validateUserRegistration,
		 handleUserRegistration,
		 handleGetUser,
		 validateUserLogin,
		 handleUserLogin,
		 DbUserMatchCheck,
		 DbCreateUser,
		 */
  DbUserCheckRegistration,
  DbCheckEmailAlreadyExists,
  DbCheckUsernameAlreadyExists
} from '../../controllers/users.ts';

describe('DbCheckEmailAlreadyExists', () => {
  it('should return true if email already exists', async () => {
    User.findOne = jest.fn().mockResolvedValue({ email: 'existe@email.com' });
    const result = await DbCheckEmailAlreadyExists('email');
    expect(result).toBe(true);
  });

  it('should return false if email does not exist', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const result = await DbCheckEmailAlreadyExists('email');
    expect(result).toBe(false);
  });

  it('should return false if email is empty', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const result = await DbCheckEmailAlreadyExists('');
    expect(result).toBe(false);
  });
});

describe('DbCheckUsernameAlreadyExists', () => {
  it('should return true if username already exists', async () => {
    User.findOne = jest.fn().mockResolvedValue({ username: 'username' });
    const result = await DbCheckUsernameAlreadyExists('username');
    expect(result).toBe(true);
  });

  it('should return false if username does not exist', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const result = await DbCheckUsernameAlreadyExists('username');
    expect(result).toBe(false);
  });

  it('should return false if username is empty', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const result = await DbCheckUsernameAlreadyExists('');
    expect(result).toBe(false);
  });
});

describe('DbUserCheckRegistration', () => {
  it('should return 400 and error message if email already exists', async () => {
    mockDbCheckEmailAlreadyExists = jest.fn().mockResolvedValue(true);
    const result = await DbUserCheckRegistration('email');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if username already exists', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(true);
    const result = await DbUserCheckRegistration('username');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if email is empty', async () => {
    mockDbCheckEmailAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if username is empty', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password is empty', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password is less than 8 characters', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password is more than 20 characters', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password does not contain a number', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password does not contain a lowercase letter', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password does not contain an uppercase letter', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return 400 and error message if password does not contain a special character', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(false);
  });

  it('should return true if all checks pass', async () => {
    mockDbCheckUsernameAlreadyExists = jest.fn().mockResolvedValue(false);
    const result = await DbUserCheckRegistration('');
    expect(result).toBe(true);
  });
});
