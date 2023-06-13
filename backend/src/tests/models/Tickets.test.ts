import mongoose, { ConnectOptions } from 'mongoose';
import Ticket from '../../models/Ticket.ts';

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

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save a new ticket', async () => {
    const ticket = new Ticket({
      user: '',
      nomTicket: 'Ticket 1',
      description: 'Description du ticket 1',
      etat: 'En cours',
      dateCreation: '2020-01-01',
      dateFin: '2020-01-02',
      impact: 'Moyen',
      priorite: 'Haute',
      categorie: 'Catégorie 1',
      cause: 'Cause 1',
      solution: 'Solution 1',
      commentaire: 'Commentaire 1',
      assigneA: 'Assigné à 1',
      assignePar: 'Assigné par 1',
      tempsEstime: 'Temps estimé 1',
      tempsPasse: 'Temps passé 1',
      tempsRestant: 'Temps restant 1'
    });

    const savedTicket = await ticket.save();

    expect(savedTicket._id).toBeDefined();
    expect(savedTicket.nomTicket).toBe(ticket.nomTicket);
    expect(savedTicket.description).toBe(ticket.description);
    expect(savedTicket.etat).toBe(ticket.etat);
    expect(savedTicket.dateCreation).toBe(ticket.dateCreation);
    expect(savedTicket.dateFin).toBe(ticket.dateFin);
    expect(savedTicket.impact).toBe(ticket.impact);
    expect(savedTicket.priorite).toBe(ticket.priorite);
    expect(savedTicket.categorie).toBe(ticket.categorie);
    expect(savedTicket.cause).toBe(ticket.cause);
    expect(savedTicket.solution).toBe(ticket.solution);
    expect(savedTicket.commentaire).toBe(ticket.commentaire);
    expect(savedTicket.assigneA).toBe(ticket.assigneA);
    expect(savedTicket.assignePar).toBe(ticket.assignePar);
    expect(savedTicket.tempsEstime).toBe(ticket.tempsEstime);
    expect(savedTicket.tempsPasse).toBe(ticket.tempsPasse);
    expect(savedTicket.tempsRestant).toBe(ticket.tempsRestant);
  });
});
