import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findDailyAvailabilityFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
