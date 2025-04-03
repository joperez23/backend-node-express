import { Router } from 'express';
import { PersonController } from '../controllers/PersonController';

const router = Router();
const controller = new PersonController();

router.post('/persons', (req, res) => controller.create(req, res));
router.get('/persons', (req, res) => controller.getAll(req, res));
router.get('/persons/:id', (req, res) => controller.getById(req, res));
router.put('/persons/:id', (req, res) => controller.update(req, res));
router.delete('/persons/:id', (req, res) => controller.delete(req, res));

export default router;