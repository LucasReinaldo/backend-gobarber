import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { day, month, year } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await listProvidersDayAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(dayAvailability);
  }
}

export default ProviderDayAvailabilityController;
