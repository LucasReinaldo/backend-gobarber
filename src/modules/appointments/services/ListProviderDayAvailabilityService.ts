import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const firstHour = 8;

    const appointments = await this.appointmentsRepository.findDailyAvailabilityFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hoursInDay = Array.from(
      { length: 10 },
      (_, index) => index + firstHour,
    );

    const currentDate = new Date(Date.now());

    const availability = hoursInDay.map((hour) => {
      const hasAppointmentAt = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentAt && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailability;
