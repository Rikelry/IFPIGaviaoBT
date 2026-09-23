import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export interface MenuRepository {
    listarCategorias(): Promise<Category[]>;

    listarProdutosPorCategoria(
        categoriaId: string
    ): Promise<Product[]>;

    buscarProdutoPorId(
        produtoId: string
    ): Promise<Product | undefined>;
}
