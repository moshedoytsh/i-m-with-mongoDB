import express from 'express';
import * as controllers from '../controllers/products-controllers.js'
const router = express.Router();

router.get('/', controllers.getAllProducts);
router.get('/:id', controllers.getProductById);
router.patch('/:id', controllers.updateProduct);
router.post('/update-quantity/:id', controllers.updateQuantity);
router.post('/', controllers.appendProduct);
router.delete('/:id', controllers.deleteProduct);

export default router;