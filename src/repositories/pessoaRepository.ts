import { ObjectId } from 'mongodb';
import connect from '../db';

const COLLECTION = "pessoas";

import Pessoa from '../models/pessoa';

const pessoas: Pessoa[] = [];

// Função usada para retornar todas as pessoas cadastradas
async function findAll(): Promise<Pessoa[]> {
    const db = await connect();
    const pessoas = await db.collection(COLLECTION). find().toArray();

    return pessoas.map(p => new Pessoa(p.nome, p.email, p._id));
}

// Função usada para retornar uma pessoa específica
async function findOne(id: ObjectId | string): Promise<Pessoa | null>{
    if(!ObjectId.isValid(id)) throw new Error("Id inválido");

    const db = await connect();
    const pessoa = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

    if(!pessoa) return null;

    return new Pessoa(pessoa.nome, pessoa.email, pessoa._id);

}

// Função usada para adicionar uma nova pessoa
async function save(pessoa: Pessoa): Promise<Pessoa> {
    if(!pessoa.nome || !pessoa.email) throw new Error("Nome e email são obrigatórios");

    const db = await connect();
    const result = await db.collection(COLLECTION).insertOne(pessoa);
    pessoa._id = result.insertedId;
    return pessoa;
}

//Função usada para atualizar uma pessoa
async function update(id: string | ObjectId, newPessoa: Pessoa): Promise<Pessoa | null> {
    if(!ObjectId.isValid(id)) throw new Error("Id inválido");

    const db = await connect();
    await db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: newPessoa });

    return findOne(id);
}

//Função usada para excluir uma pessoa
async function deleteOne(id: string | ObjectId): Promise<boolean> {
    if(!ObjectId.isValid(id)) throw new Error("Id inválido");

    const db = await connect();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
}

export default {
    findAll,
    save,
    deleteOne,
    update,
    findOne
}