import { v4 as idUser } from "uuid";
import { Notes } from "./Notes";

export class Users {

    private _idUser: string;

    constructor(
        private _email: string,
        private _password: string,
        private _notes?: Notes[]
    ){
        this._idUser = idUser(),
        this._notes = this._notes ?? []
    }

    public get id() {
        return this._idUser;
    }

    public get email() {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password() {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get note() {
        return this._notes;
    }

    public getUsers() {
        return {
            id: this._idUser,
            email: this._email,
            notes: this._notes,
            password: this._password
        }
    }

}