import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateColorService from '@modules/products/services/color/CreateColorService';
import DeleteColorService from '@modules/products/services/color/DeleteColorService';
import FindColorService from '@modules/products/services/color/FindColorsService';
import UpdateColorService from '@modules/products/services/color/UpdateColorService';

import ICreateColorDTO from '@modules/products/dtos/ICreateColorDTO';

// Regra de CRUD em REST
// index, show, create, update, delete

interface IRequest {
  code?: string;
  description?: string;
}

class ColorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.body as ICreateColorDTO;

    const createColorService = container.resolve(CreateColorService);

    const color = await createColorService.execute({ code, description });

    return response.send(color);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { code, description } = request.query as IRequest;

    const findColorService = container.resolve(FindColorService);

    const color = await findColorService.execute({ code, description });

    return response.send(color);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const { description } = request.body as ICreateColorDTO;

    const updateColorService = container.resolve(UpdateColorService);

    const color = await updateColorService.execute({ code, description });

    return response.send(color);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const deleteColorService = container.resolve(DeleteColorService);

    const color = await deleteColorService.execute(code);

    return response.send(color);
  }
}

export default ColorsController;
