import express from 'express';
import pessoaController from '../controllers/pessoaController';

const router = express.Router();

router.get('/', pessoaController.getPessoas);
router.get('/:id', pessoaController.getPessoa);
router.post('/', pessoaController.postPessoa);
router.patch('/:id', pessoaController.patchPessoa);
router.delete('/:id', pessoaController.deletePessoa);

export default router;