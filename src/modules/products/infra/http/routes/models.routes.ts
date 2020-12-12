import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ModelsController from '../controllers/ModelsController';

const modelsController = new ModelsController();

const modelRoutes = Router();

modelRoutes.use(ensureAuthenticated);

modelRoutes.post('/', modelsController.create);

modelRoutes.get('/', modelsController.index);

modelRoutes.put('/:code', modelsController.update);

modelRoutes.delete('/:code', modelsController.delete);

export default modelRoutes;
