import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindMonthlyAvailabilityFromProviderDTO from '../dtos/IFindMonthlyAvailabilityFromProviderDTO';
import IFindDailyAvailabilityFromProviderDTO from '../dtos/IFindDailyAvailabilityFromProviderDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findMonthlyAvailabilityFromProvider(
    data: IFindMonthlyAvailabilityFromProviderDTO,
  ): Promise<Appointment[]>;
  findDailyAvailabilityFromProvider(
    data: IFindDailyAvailabilityFromProviderDTO,
  ): Promise<Appointment[]>;
}
