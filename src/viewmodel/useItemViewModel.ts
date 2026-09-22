import { useEffect, useState } from "react";

import { Product } from "../model/entities/Product";
import { MenuService } from "../model/services/MenuService";

const menuService = new MenuService();

export function useItemViewModel(produtoId: string) {
    const [carregando, setCarregando] = useState(true);
    const [produto, setProduto] = useState<Product | undefined>(undefined);
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        carregarProduto();
    }, [produtoId]);

    async function carregarProduto() {
        try {
            setCarregando(true);

            const resultado = await menuService.buscarProdutoPorId(produtoId);

            setProduto(resultado);
        } finally {
            setCarregando(false);
        }
    }

    function aumentarQuantidade() {
        setQuantidade((valorAtual) => valorAtual + 1);
    }

    function diminuirQuantidade() {
        setQuantidade((valorAtual) => Math.max(1, valorAtual - 1));
    }

    return {
        carregando,
        produto,
        quantidade,
        aumentarQuantidade,
        diminuirQuantidade,
    };
}
