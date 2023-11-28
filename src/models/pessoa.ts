import { ObjectId } from 'mongodb';

export default class Pessoa {
    _id?: ObjectId;
    nome: string;
    email: string;

    constructor(nome: string, email: string, id?: ObjectId) {
        this._id = id;
        this.nome = nome;
        this.email = email;
    }
}