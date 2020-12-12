import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ColorsController from '../controllers/ColorsController';

const colorsController = new ColorsController();

const colorRoutes = Router();

colorRoutes.use(ensureAuthenticated);

colorRoutes.post('/', colorsController.create);

colorRoutes.get('/', colorsController.index);

colorRoutes.put('/:code', colorsController.update);

colorRoutes.delete('/:code', colorsController.delete);

export default colorRoutes;
