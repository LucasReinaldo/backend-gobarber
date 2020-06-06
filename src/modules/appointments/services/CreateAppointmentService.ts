import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

/** para que não seja instanciado e criado dois locais com repositórios diferentes
usamos o Dependency inversion principle in JavaScript (SOLID)
dessa forma recebemos o mesmo repositório, mesmo banco de dados nesse caso e
executamos nossa regra de negócio, as verificações necessárias, pois em repositories
que iremos criar o repositório. */
@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentRepository;

  private notificationsRepository: INotificationsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }
  // OR we can use a short syntax.
  // constructor(@inject('AppointmentsRepository')private appointmentsRepository: IAppointmentRepository,) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment in a past date.');
    }

    if (user_id === provider_id) {
      throw new AppError('User and Provider must not be the same');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('Appointments must be schedule between 8am and 5pm.');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Appointment is already booked.');
    }

    // enviamos para appointmentsRepository os dados para criação do registro.
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy '-' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New schedule for ${formattedDate}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'd-M-YYYY',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
