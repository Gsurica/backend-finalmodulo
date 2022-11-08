import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { notesRouter } from './routes/notes.routes';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/notes', notesRouter);

