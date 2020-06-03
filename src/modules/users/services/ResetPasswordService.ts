import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userByToken = await this.userTokensRepository.findByToken(token);

    if (!userByToken) {
      throw new AppError(
        'Token does not exists. Please check your credentials.',
      );
    }

    const user = await this.usersRepository.findById(userByToken.user_id);

    if (!user) {
      throw new AppError(
        'User does not exists. Please check your credentials.',
      );
    }

    const tokenCreatedAt = userByToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
