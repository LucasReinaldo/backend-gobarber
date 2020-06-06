// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepositoy';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the daily provider appointments', async () => {
    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'useruser',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'useruser',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment, appointment1]);
  });
});
