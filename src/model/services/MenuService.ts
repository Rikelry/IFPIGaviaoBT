import {
    simularConsultaCategorias,
    simularConsultaProdutosPorCategoria,
    simularConsultaProdutoPorId,
} from "../../data/mockDatabase";

import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export class MenuService {
    async listarCategorias(): Promise<Category[]> {
        return simularConsultaCategorias();
    }

    async listarProdutosPorCategoria(
        categoriaId: string
    ): Promise<Product[]> {
        return simularConsultaProdutosPorCategoria(categoriaId);
    }

    async buscarProdutoPorId(
        produtoId: string
    ): Promise<Product | undefined> {
        return simularConsultaProdutoPorId(produtoId);
    }
}
