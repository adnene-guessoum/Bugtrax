import mongoose from 'mongoose';
import { IUser } from './User';

export interface TicketDocument extends mongoose.Document {
  user: IUser;
  nomTicket: string;
  description: string;
  etat: string;
  dateCreation: Date;
  dateFin: Date;
  impact: string;
  priorite: string;
  categorie: string;
  cause: string;
  solution: string;
  commentaire: string;
  assigneA: string;
  assignePar: string;
  tempsEstime: string;
  tempsPasse: string;
  tempsRestant: string;
}

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nomTicket: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  etat: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  priorite: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  cause: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  commentaire: {
    type: String,
    required: true
  },
  assigneA: {
    type: String,
    required: true
  },
  assignePar: {
    type: String,
    required: true
  },
  tempsEstime: {
    type: String,
    required: true
  },
  tempsPasse: {
    type: String,
    required: true
  },
  tempsRestant: {
    type: String,
    required: true
  }
});

const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);

export default Ticket;
