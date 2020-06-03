import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providersDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthentication);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.index,
);

export default providersRouter;
