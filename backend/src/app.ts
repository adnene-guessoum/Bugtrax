import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import userRouter from './routes/users.ts';
import ticketRouter from './routes/tickets.ts';

const hostname = '0.0.0.0';
const port = 8000;

const app = express();

// base de données
const uri = process.env.MONGO_URI as string;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectOptions)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);

app.get('/', (req, res) => {
  console.log(req.headers);
  res.status(200).send('Hello world!');
});

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
