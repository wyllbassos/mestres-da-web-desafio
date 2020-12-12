import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/product/CreateProductService';
import DeleteProductService from '@modules/products/services/product/DeleteProductService';
import FindProductService from '@modules/products/services/product/FindProductsService';
import UpdateProductService from '@modules/products/services/product/UpdateProductService';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

// Regra de CRUD em REST
// index, show, create, update, delete

interface IRequest {
  sku?: string;
}

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateProductDTO;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      ...data,
      balance: Number(data.balance),
    });

    return response.send(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { sku } = request.query as IRequest;

    const findProductService = container.resolve(FindProductService);

    const product = await findProductService.execute({ sku });

    return response.send(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sku } = request.params;

    const { description, balance } = request.body as IUpdateProductDTO;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      sku,
      description,
      balance: Number(balance),
    });

    return response.send(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sku } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    const product = await deleteProductService.execute(sku);

    return response.send(product);
  }
}

export default ProductsController;
