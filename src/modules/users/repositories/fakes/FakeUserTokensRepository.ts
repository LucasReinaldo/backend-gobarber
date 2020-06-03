import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userByToken = this.tokens.find(
      (findToken) => findToken.token === token,
    );

    return userByToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
