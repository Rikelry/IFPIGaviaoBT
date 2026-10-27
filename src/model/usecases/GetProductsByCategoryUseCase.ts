import { Product } from "../entities/Product";
import { MenuRepository } from "../repositories/MenuRepository";

export class GetProductsByCategoryUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(categoriaId: string): Promise<Product[]> {
    return this.menuRepository.listarProdutosPorCategoria(categoriaId);
  }
}
