import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const productRoutes = Router();

productRoutes.use(ensureAuthenticated);

productRoutes.post('/', productsController.create);

productRoutes.get('/', productsController.index);

productRoutes.put('/:sku', productsController.update);

productRoutes.delete('/:sku', productsController.delete);

export default productRoutes;
