import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

/*
import userRouter from './routes/users';
import authRouter from './routes/auth';
import ticketRouter from './routes/tickets';
*/

const hostname = '0.0.0.0';
const port = 8000;

const app = express();

app.use(express.json());

/*
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tickets', ticketRouter);
*/

app.get('/', (req, res) => {
  console.log(req.headers);
  res.status(200).send('Hello world!');
});

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
