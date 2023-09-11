import express from 'express';
import { Request, Response } from 'express';
import productRouter from '../products/routes/router.js';

const router = express.Router();

router.use('/api/products', productRouter);
router.use('/static', express.static('public'));
router.use((req: Request, res: Response) => {
    res.status(404).send('Resource not found.');
});

export default router;