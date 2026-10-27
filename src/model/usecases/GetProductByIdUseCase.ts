import { Product } from "../entities/Product";
import { MenuRepository } from "../repositories/MenuRepository";

export class GetProductByIdUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(produtoId: string): Promise<Product | undefined> {
    return this.menuRepository.buscarProdutoPorId(produtoId);
  }
}
