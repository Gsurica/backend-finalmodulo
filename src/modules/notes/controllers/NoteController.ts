import { Request, Response } from "express";
import { usersList } from "../data/userList";
import { Notes } from "../models/Notes";

export class NotesController {

    public createNote(req: Request, res: Response) {

        try {

            const {idUser} = req.params;
            const {title, description, saved} = req.body;           

            if(!title) {
                return res.status(400).send({
                    ok: false,
                    message: 'Title not provided!'
                })
            }

            if(!description) {
                return res.status(400).send({
                    ok: false,
                    message: 'Description not provided!'
                })
            }

            const note = new Notes(title, description, saved);
            const user = usersList.find(user => user.id == idUser);

            if(saved) {
                note.saveNote = true;
            }

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not founddddd!'
                })
            }

            user.note?.push(note)

            return res.status(201).send({
                ok: true,
                message: 'Note registered successfully!',
                data: {
                    id: user.id,
                    title: note.title,
                    description: note.description
                }
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }
    public listNotesByUser(req: Request, res: Response) {

        try {

            const {idUser} = req.params;
            const {title, description} = req.body;

            const user = usersList.find(user => user.id == idUser);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            let listNotes = user.note || [];

            if(title) {
                listNotes = listNotes.filter(notes => notes.title == title);
            }

            if(description) {
                listNotes = listNotes.filter(notes => notes.description == description);
            }

            return res.status(200).send({
                notes: listNotes.map(item => {
                    return {
                        id: item.idNotes,
                        title: item.title,
                        description: item.description,
                        saved: item.saveNote
                    }
                })
            })
            
        } catch (error: any) {
         
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public editNote(req: Request, res: Response) {

        try {

            const {idUser, idNote} = req.params;
            const {title, description} = req.body;

            const user = usersList.find(user => user.id == idUser)

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const note = user.note?.find(note => note.idNotes == idNote)

            if(!note) {
                return res.status(404).send({
                    ok: false,
                    message: 'Note not found!'
                })
            }

            note.title = title;
            note.description = description;

            return res.status(200).send({
                ok: true,
                message: 'Note successfully updated!',
                data: {
                    title,
                    description
                }
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public deleteNote(req: Request, res: Response) {

        try {

            const {idUser, idNote} = req.params;

            const user = usersList.find(user => user.id == idUser)

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const note = user.note
            ? user.note.findIndex(note => note.idNotes == idNote)
            : -1;

            if(note < 0) {
                return res.status(404).send({
                    ok: false,
                    message: 'Note not found!'
                })
            }

            user.note?.splice(note, 1)

            return res.status(200).send({
                ok: true,
                message: 'Note deleted successfully!'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public savedNotes(req: Request, res: Response) {

        try {

            const {idUser, idNote} = req.params;
            const {saved} = req.body;

            const user = usersList.find(user => user.id == idUser);

            if(!user) {
                return res.send(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            const note = user.note?.find(note => note.idNotes == idNote);

            if(!note) {
                return res.status(404).send({
                    ok: false,
                    message: 'Note not found!'
                })
            }

            note.saveNote = saved;

            return res.status(200).send({
                ok: true,
                message: 'Flag changed!'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public listAllSavedNotes(req: Request, res: Response) {

        try {

            const {idUser} = req.params;

            const user = usersList.find(user => user.id == idUser);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            let listNotes = user.note || [];

            let returnListNotes = listNotes.filter(note => note.saveNote === true)

            return res.status(200).send({
                ok: true,
                message: 'List of saved messages!',
                data: returnListNotes
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

}