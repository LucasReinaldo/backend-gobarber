import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findMonthlyAvailabilityFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = daysInMonth.map((day) => {
      const appointmentsInADay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return { day, available: appointmentsInADay.length < 10 };
    });

    return availability;
  }
}

export default ListProviderMonthAvailability;
