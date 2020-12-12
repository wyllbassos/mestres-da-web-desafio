import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/products/services/category/CreateCategoryService';
import DeleteCategoryService from '@modules/products/services/category/DeleteCategoryService';
import FindCategoryService from '@modules/products/services/category/FindCategoriesService';
import UpdateCategoryService from '@modules/products/services/category/UpdateCategoryService';

import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';

// Regra de CRUD em REST
// index, show, create, update, delete

interface IRequest {
  code?: string;
  description?: string;
}

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.body as ICreateCategoryDTO;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({ code, description });

    return response.send(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.query as IRequest;

    const findCategoryService = container.resolve(FindCategoryService);

    const category = await findCategoryService.execute({ code, description });

    return response.send(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const { description } = request.body as ICreateCategoryDTO;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const category = await updateCategoryService.execute({ code, description });

    return response.send(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const deleteCategoryService = container.resolve(DeleteCategoryService);

    const category = await deleteCategoryService.execute(code);

    return response.send(category);
  }
}

export default CategoriesController;
