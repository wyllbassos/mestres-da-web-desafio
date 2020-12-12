import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesController = new CategoriesController();

const categoryRoutes = Router();

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.post('/', categoriesController.create);

categoryRoutes.get('/', categoriesController.index);

categoryRoutes.put('/:code', categoriesController.update);

categoryRoutes.delete('/:code', categoriesController.delete);

export default categoryRoutes;
