export interface IUser extends mongoose.Document {
  nomUtilisateur: string;
  motDePasse: string;
  email: string;
  role?: string;
  dateCreation?: Date;
  admin?: boolean;
}

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
