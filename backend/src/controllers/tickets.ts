/*
 * controllers tickets routes
 */
import { Response, Request } from 'express';
import Ticket, { TicketDocument } from '../models/tickets.ts';
import { validationResult } from 'express-validator';

const handleGetTickets = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({
      dateCreation: -1
    });
    if (!tickets) {
      return res.status(404).json({ msg: 'Aucun ticket trouvé' });
    }
    res.json(tickets);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la récupération des tickets');
  }
};

const handleGetTicketDetails = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket non trouvé' });
    }
    res.json(ticket);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la récupération du ticket');
  }
};

const handleCreateTicket = async (
  req: Request & { user: any },
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    nomTicket,
    description,
    etat,
    dateCreation,
    priorite,
    tempsEstime,
    tempsPasse
  }: Partial<TicketDocument> = req.body;

  try {
    const newTicket = new Ticket<Partial<TicketDocument>>({
      user: req.user.id,
      nomTicket,
      description,
      etat,
      dateCreation,
      priorite,
      tempsEstime,
      tempsPasse
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la création du ticket');
  }
};

const handleUpdateTicket = async (
  req: Request & { user: any },
  res: Response
) => {
  const {
    nomTicket,
    description,
    etat,
    dateCreation,
    priorite,
    tempsEstime,
    tempsPasse
  } = req.body;
  const ticketFields = {} as Partial<TicketDocument>;
  if (nomTicket) ticketFields.nomTicket = nomTicket;
  if (description) ticketFields.description = description;
  if (etat) ticketFields.etat = etat;
  if (dateCreation) ticketFields.dateCreation = dateCreation;
  if (priorite) ticketFields.priorite = priorite;
  if (tempsEstime) ticketFields.tempsEstime = tempsEstime;
  if (tempsPasse) ticketFields.tempsPasse = tempsPasse;

  try {
    let ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket non trouvé' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }

    ticket = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { $set: ticketFields },
      { new: true }
    );

    res.json(ticket);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la mise à jour du ticket');
  }
};

const handleDeleteTicket = async (
  req: Request & { user: any },
  res: Response
) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket non trouvé' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }

    await Ticket.findByIdAndRemove(req.params.ticketId);

    res.json({ msg: 'Ticket supprimé' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur lors de la suppression du ticket');
  }
};

export {
  handleGetTickets,
  handleGetTicketDetails,
  handleCreateTicket,
  handleUpdateTicket,
  handleDeleteTicket
};
