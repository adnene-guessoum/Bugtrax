import express, { Request, Response } from 'express';

const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tickets', require('./routes/tickets'));

app.get('/', (req: Request, res: Response) => {
  console.log(req.headers);
  res.status(200).send('Hello world!');
});

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
