import { Request, Response } from "express";
import { usersList } from "../data/userList";
import { Users } from "../models/Users";

export class UsersController {

    public listAllUser(req: Request, res: Response) {

        try {

            let users = usersList;

            let usersListReturn = users.map(user => {
                return user.getUsers();
            })
            
            return res.status(200).send({
                ok: true,
                message: 'List of all users!',
                data: usersListReturn
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public listUserById(req: Request, res: Response) {

        try {

            const {idUser} = req.params;

            const users = usersList.find(user => user.id == idUser)

            if(!users) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            return res.status(200).send({
                ok: true,
                message: 'User found!',
                data: users
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public registerUser(req: Request, res: Response) {

        try {

            const { email, password } = req.body;

            if(!email) {
                return res.status(400).send({
                    ok: false,
                    message: 'Email not provided!'
                })
            }

            if(!password) {
                return res.status(400).send({
                    ok: false,
                    message: 'Password not provided!'
                })
            }

            const user = new Users(email, password);
            usersList.push(user);
            
            return res.status(201).send({
                ok: true,
                message: 'User registered successfully!',
                id: user.id,
                email: user.email,
                password: user.password
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public editUser(req: Request, res: Response) {

        try {

            const {email} = req.params;
            const {password} = req.body;

            const user = usersList.find(user => user.email === email)
            console.log(user?.email)

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            user.password = password;

            return res.status(200).send({
                ok: true,
                message: 'User successfully updated!',
                data: user
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public deleteUser(req: Request, res: Response) {

        try {

            const {idUser} = req.params;

            const user = usersList.findIndex(user => user.id === idUser)

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }

            usersList.splice(user, 1)

            return res.status(200).send({
                ok: true,
                message: 'User successfully deleted!'
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Server instability!',
                error: error.toString()
            })

        }

    }

    public login(req: Request, res: Response) {

        try {

            const {email, password} = req.body;

            const user = usersList.find(user => user.email == email && user.password == password);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: 'User not found!'
                })
            }      

            return res.status(200).send({
                ok: true,
                message: 'User found!',
                data: {
                    id: user.id,
                    email: user.email
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

}