import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { charactersRouter } from './routers/characters-router';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/marvel', charactersRouter);
app.get('/', (req: Request, res: Response) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Endpoints</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.5; text-align: center; padding: 20px;">
            <h1>Bienvenido a la API</h1>
            <p>Los endpoints disponibles son:</p>
            <ul style="list-style: none; padding: 0;">
                <li><a href="/marvel/characters/0">/marvel/characters/:page</a> - Lista de personajes paginada</li>
                <li><a href="/marvel/character/1011334">/marvel/character/:id</a> - Detalle del personaje con la id enviada</li>
                <li><a href="/users">/users</a> - Administra usuarios</li>
            </ul>
        </body>
        </html>
    `);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  req;
  next;
  let status: number;
  switch (error.name) {
    case 'ValidationError':
      status = 406;
      break;
    case 'URIError':
      status = 400;
      break;
    case 'ReferenceError':
      status = 404;
      break;
    case 'RangeError':
      status = 416;
      break;
    default:
      status = 500;
  }
  res.status(status);
  res.end(JSON.stringify({ type: error.name, message: error.message }));
});
