import {
    simularConsultaCategorias,
    simularConsultaProdutosPorCategoria,
    simularConsultaProdutoPorId,
} from "../../data/mockDatabase";

import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { MenuRepository } from "./MenuRepository";

export class MockMenuRepository implements MenuRepository {
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
