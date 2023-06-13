import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  nomUtilisateur: string;
  motDePasse: string;
  email: string;
  role: string;
  dateCreation: Date;
  admin: boolean;
}

const UserSchema = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
