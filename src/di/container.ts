import { MenuRepository } from "../model/repositories/MenuRepository";
import { MockMenuRepository } from "../model/repositories/MockMenuRepository";
import {
  GetCategoriesUseCase,
  GetProductsByCategoryUseCase,
  GetProductByIdUseCase,
} from "../model/usecases";

export interface Container {
  readonly menuRepository: MenuRepository;
  readonly getCategoriesUseCase: GetCategoriesUseCase;
  readonly getProductsByCategoryUseCase: GetProductsByCategoryUseCase;
  readonly getProductByIdUseCase: GetProductByIdUseCase;
}

export function createContainer(customRepository?: MenuRepository): Container {
  const repository = customRepository ?? new MockMenuRepository();

  return {
    menuRepository: repository,
    getCategoriesUseCase: new GetCategoriesUseCase(repository),
    getProductsByCategoryUseCase: new GetProductsByCategoryUseCase(repository),
    getProductByIdUseCase: new GetProductByIdUseCase(repository),
  };
}

export const defaultContainer: Container = createContainer();
