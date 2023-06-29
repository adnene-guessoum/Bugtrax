import mongoose from 'mongoose';
import { IUser } from './user.js';

export interface TicketDocument extends mongoose.Document {
  user: IUser['_id'];
  nomTicket: string;
  description: string;
  etat: string;
  dateCreation: Date;
  priorite: string;
  tempsEstime: number;
  tempsPasse: number;
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
  priorite: {
    type: String,
    required: true
  },
  tempsEstime: {
    type: Number, // en heures
    required: true,
    default: 0
  },
  tempsPasse: {
    type: Number, // en heures
    default: 0
  }
});

const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);

export default Ticket;
