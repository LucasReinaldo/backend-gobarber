import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
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
