import { Router } from "express";
import { NotesController } from "../controllers/Notes.controller";
import { UsersController } from "../controllers/User.controller";
import { userValidator } from "../middlewares/user.validator.middleware";

export const notesRouter = Router();

// ##################### USERS ##########################

notesRouter.get('/users', new UsersController().listAllUser);

notesRouter.get('/users/:idUser', new UsersController().listUserById);

notesRouter.post('/users', [userValidator], new UsersController().registerUser);

notesRouter.put('/users/:email', new UsersController().editUser);

notesRouter.delete('/users/:idUser', new UsersController().deleteUser);

notesRouter.post('/login', new UsersController().login);

//##################### NOTES #############################

notesRouter.post('/:idUser', new NotesController().createNote);

notesRouter.get('/:idUser', new NotesController().listNotesByUser);

notesRouter.put('/:idUser/:idNote', new NotesController().editNote);

notesRouter.delete('/:idUser/:idNote', new NotesController().deleteNote);

notesRouter.put('/flag/:idUser/:idNote', new NotesController().savedNotes);

notesRouter.get('/flag/:idUser/', new NotesController().listAllSavedNotes);
