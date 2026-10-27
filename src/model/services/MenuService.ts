import { defaultContainer } from "../../di/container";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { MenuRepository } from "../repositories/MenuRepository";
import {
  GetCategoriesUseCase,
  GetProductByIdUseCase,
  GetProductsByCategoryUseCase,
} from "../usecases";

export class MenuService {
  private readonly getCategoriesUseCase: GetCategoriesUseCase;
  private readonly getProductsByCategoryUseCase: GetProductsByCategoryUseCase;
  private readonly getProductByIdUseCase: GetProductByIdUseCase;

  constructor(customRepository?: MenuRepository) {
    if (customRepository) {
      this.getCategoriesUseCase = new GetCategoriesUseCase(customRepository);
      this.getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(
        customRepository
      );
      this.getProductByIdUseCase = new GetProductByIdUseCase(customRepository);
    } else {
      this.getCategoriesUseCase = defaultContainer.getCategoriesUseCase;
      this.getProductsByCategoryUseCase =
        defaultContainer.getProductsByCategoryUseCase;
      this.getProductByIdUseCase = defaultContainer.getProductByIdUseCase;
    }
  }

  async listarCategorias(): Promise<Category[]> {
    return this.getCategoriesUseCase.execute();
  }

  async listarProdutosPorCategoria(categoriaId: string): Promise<Product[]> {
    return this.getProductsByCategoryUseCase.execute(categoriaId);
  }

  async buscarProdutoPorId(produtoId: string): Promise<Product | undefined> {
    return this.getProductByIdUseCase.execute(produtoId);
  }
}
