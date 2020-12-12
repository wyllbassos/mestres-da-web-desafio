import { container, delay } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/products/infra/typeorm/repositories/CategoriesRepository';

import IColorsRepository from '@modules/products/repositories/IColorsRepository';
import ColorsRepository from '@modules/products/infra/typeorm/repositories/ColorsRepository';

import IModelsRepository from '@modules/products/repositories/IModelsRepository';
import ModelsRepository from '@modules/products/infra/typeorm/repositories/ModelsRepository';

import ISizesRepository from '@modules/products/repositories/ISizesRepository';
import SizesRepository from '@modules/products/infra/typeorm/repositories/SizesRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository,
  // delay(() => UsersRepository),
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', CategoriesRepository,
  // delay(() => AppointmentsRepository),
);

container.registerSingleton<IColorsRepository>(
  'ColorsRepository', ColorsRepository,
  // delay(() => AppointmentsRepository),
);

container.registerSingleton<IModelsRepository>(
  'ModelsRepository', ModelsRepository,
  // delay(() => AppointmentsRepository),
);

container.registerSingleton<ISizesRepository>(
  'SizesRepository', SizesRepository,
  // delay(() => AppointmentsRepository),
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository', ProductsRepository,
  // delay(() => AppointmentsRepository),
);
