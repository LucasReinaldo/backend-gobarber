import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,

    @inject('HashProvider') private hashRepository: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const verifyEmail = await this.usersRepository.findByEmail(email);

    if (verifyEmail && verifyEmail.id !== user_id) {
      throw new AppError('Email already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You must inform your password to set a new password.',
      );
    }

    if (password && old_password) {
      const compareOldPassword = await this.hashRepository.compareHash(
        old_password,
        user.password,
      );

      if (!compareOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashRepository.generateHash(password);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
