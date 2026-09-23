import { useEffect, useState } from "react";

import { Product } from "../model/entities/Product";
import { MenuService } from "../model/services/MenuService";

const menuService = new MenuService();

export function useCategoryViewModel(categoriaId: string) {
    const [carregando, setCarregando] = useState(true);
    const [produtos, setProdutos] = useState<Product[]>([]);

    useEffect(() => {
        carregarProdutos();
    }, [categoriaId]);

    async function carregarProdutos() {
        try {
            setCarregando(true);
            const resultado =
                await menuService.listarProdutosPorCategoria(categoriaId);
            setProdutos(resultado);
        } finally {
            setCarregando(false);
        }
    }

    return {
        carregando,
        produtos,
    };
}
