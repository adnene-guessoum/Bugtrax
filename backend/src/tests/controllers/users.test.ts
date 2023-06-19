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
  	 DbUserCheckRegistration,
		 */
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
