import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

import categoriesRoutes from '@modules/products/infra/http/routes/categories.routes';
import colorsRoutes from '@modules/products/infra/http/routes/colors.routes';
import modelsRoutes from '@modules/products/infra/http/routes/models.routes';
import sizesRoutes from '@modules/products/infra/http/routes/sizes.routes';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.use('/categories', categoriesRoutes);
routes.use('/colors', colorsRoutes);
routes.use('/models', modelsRoutes);
routes.use('/sizes', sizesRoutes);
routes.use('/products', productsRoutes);

export default routes;
