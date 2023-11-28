import { NextFunction, Request, Response } from "express";
import Pessoa from "src/models/pessoa";
import pessoaRepository from "../repositories/pessoaRepository";

async function getPessoas(req: Request, res: Response, next: NextFunction){
    const pessoas = await pessoaRepository.findAll();
    res.json(pessoas);
}

async function getPessoa(req: Request, res: Response, next: NextFunction){
    const id = req.params.id;
    const pessoa = await pessoaRepository.findOne(id);
    if(pessoa)
        res.json(pessoa);
    else
        res.status(404).send();
}

async function postPessoa(req: Request, res: Response, next: NextFunction){
    const pessoa = req.body as Pessoa;
    const result = await pessoaRepository.save(pessoa);
    if(result)
        res.status(201).json(result);
    else
        res.status(500).send();
}

async function patchPessoa(req: Request, res: Response, next: NextFunction){
    const id = req.params.id;
    const pessoa = req.body as Pessoa;
    const result = await pessoaRepository.update(id, pessoa);
    if(result)
        res.json(result);
    else
        res.status(404).send();
}

async function deletePessoa(req: Request, res: Response, next: NextFunction){
    const id = req.params.id;
    const success = await pessoaRepository.deleteOne(id);
    if(success)
        res.status(204).send();
    else
        res.status(404).send();
}

export default {
    getPessoas,
    getPessoa,
    postPessoa,
    patchPessoa,
    deletePessoa
}