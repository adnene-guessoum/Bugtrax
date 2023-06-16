import User from '../../models/user.ts';
import { DbCheckEmailAlreadyExists } from '../../controllers/users.ts';

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
});
