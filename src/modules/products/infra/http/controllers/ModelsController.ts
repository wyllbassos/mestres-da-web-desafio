import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModelService from '@modules/products/services/model/CreateModelService';
import DeleteModelService from '@modules/products/services/model/DeleteModelService';
import FindModelService from '@modules/products/services/model/FindModelsService';
import UpdateModelService from '@modules/products/services/model/UpdateModelService';

import ICreateModelDTO from '@modules/products/dtos/ICreateModelDTO';

// Regra de CRUD em REST
// index, show, create, update, delete

interface IRequest {
  code?: string;
  description?: string;
}

class ModelsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.body as ICreateModelDTO;

    const createModelService = container.resolve(CreateModelService);

    const model = await createModelService.execute({ code, description });

    return response.send(model);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.query as IRequest;

    const findModelService = container.resolve(FindModelService);

    const model = await findModelService.execute({ code, description });

    return response.send(model);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const { description } = request.body as ICreateModelDTO;

    const updateModelService = container.resolve(UpdateModelService);

    const model = await updateModelService.execute({ code, description });

    return response.send(model);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const deleteModelService = container.resolve(DeleteModelService);

    const model = await deleteModelService.execute(code);

    return response.send(model);
  }
}

export default ModelsController;
