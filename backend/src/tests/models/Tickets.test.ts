import mongoose, { ConnectOptions } from 'mongoose';
import Ticket from '../../models/Tickets.ts';
import { TicketDocument } from '../../models/Tickets.ts';

describe('Tickets model', () => {
  beforeAll(async () => {
    await mongoose
      .connect(
        'mongodb://admin-user:admin-password@localhost:27017/test-database?authSource=admin',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        } as ConnectOptions
      )
      .then(() => console.log('Connected to MongoDB test database...'))
      .catch(err => console.log(err));
  });

  afterEach(async () => {
    await Ticket.deleteMany({});
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save a new ticket', async () => {
    const ticket: TicketDocument = new Ticket({
      user: new mongoose.Types.ObjectId().toHexString(),
      nomTicket: 'Ticket 1',
      description: 'Description du ticket 1',
      etat: 'En cours',
      dateCreation: '2020-01-01',
      priorite: 'Haute',
      tempsEstime: 2,
      tempsPasse: 0.5
    });

    const savedTicket = await ticket.save();

    expect(savedTicket._id).toBeDefined();
    expect(savedTicket.nomTicket).toBe(ticket.nomTicket);
    expect(savedTicket.description).toBe(ticket.description);
    expect(savedTicket.etat).toBe(ticket.etat);
    expect(savedTicket.dateCreation).toBe(ticket.dateCreation);
    expect(savedTicket.priorite).toBe(ticket.priorite);
    expect(savedTicket.tempsEstime).toBe(ticket.tempsEstime);
    expect(savedTicket.tempsPasse).toBe(ticket.tempsPasse);
  });

  it('should not create a ticket without required fields', async () => {
    const ticket: TicketDocument = new Ticket({
      user: new mongoose.Types.ObjectId().toHexString(),
      nomTicket: 'Ticket 1'
    });

    let err: any;
    try {
      const savedTicket = await ticket.save();
      err = savedTicket;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
    expect(err.errors.etat).toBeDefined();
  });
});
