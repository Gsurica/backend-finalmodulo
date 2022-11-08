import { NextFunction, Request, Response } from "express";
import { usersList } from "../shared/data/userList";

export const userValidator = (req: Request, res: Response, next: NextFunction) => {

    const {email} = req.body

    const userName = usersList.some(user => user.email === email)

    if(userName) {
        return res.status(400).send({
            ok: false,
            message: 'Email already exists!'
        })
    }
    next();

}