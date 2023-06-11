import express, { Request, Response } from 'express';

const hostname = '0.0.0.0';
const port = 8000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  console.log(req.headers);
  res.status(200).send('Hello world!');
});

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
