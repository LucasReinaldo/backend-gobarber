import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate a user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'hashedPassword',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@test.com',
      password: 'hashedPassword',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should NOT be able to authenticate a non existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@test.com',
        password: 'hashedPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate a user with an invalid/wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'hashedPassword',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@test.com',
        password: 'hashed',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
