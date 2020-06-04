import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload.config';
import ensureAuthentication from '../middlewares/ensureAuthentication';

import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
