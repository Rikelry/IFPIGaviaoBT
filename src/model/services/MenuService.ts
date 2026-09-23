import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { MenuRepository } from "../repositories/MenuRepository";
import { MockMenuRepository } from "../repositories/MockMenuRepository";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository = new MockMenuRepository()
  ) {}

  async listarCategorias(): Promise<Category[]> {
    return this.menuRepository.listarCategorias();
  }

  async listarProdutosPorCategoria(
    categoriaId: string
  ): Promise<Product[]> {
    return this.menuRepository.listarProdutosPorCategoria(categoriaId);
  }

  async buscarProdutoPorId(
    produtoId: string
  ): Promise<Product | undefined> {
    return this.menuRepository.buscarProdutoPorId(produtoId);
  }
}
