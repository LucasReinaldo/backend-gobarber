import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    // vai carregar o service (CreateAppointmentService), no constructor vai ver se ele precisa de
    // de qualquer dependência, se sim ele vai no container buscar a dependência com o mesmo nome
    // ao encontrar ele vai no segundo parâmetro para buscar a mesma, retornando uma instância da
    // dependência, nesse caso AppointmentsRepository.

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
