import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserSercice from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserSercice);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default SessionsController;
