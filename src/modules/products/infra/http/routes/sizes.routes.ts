import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SizesController from '../controllers/SizesController';

const sizesController = new SizesController();

const sizeRoutes = Router();

sizeRoutes.use(ensureAuthenticated);

sizeRoutes.post('/', sizesController.create);

sizeRoutes.get('/', sizesController.index);

sizeRoutes.put('/:code', sizesController.update);

sizeRoutes.delete('/:code', sizesController.delete);

export default sizeRoutes;
