import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Lucas',
      email: 'lucas@test.com',
      password: 'hashedPassword',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
  });

  it('should NOT be able to create a new user with duplicate email address', async () => {
    await createUserService.execute({
      name: 'Lucas',
      email: 'lucas@test.com',
      password: 'hashedPassword',
    });

    await expect(
      createUserService.execute({
        name: 'Lucas',
        email: 'lucas@test.com',
        password: 'hashedPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
