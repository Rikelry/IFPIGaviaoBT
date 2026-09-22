import { useEffect, useState } from "react";

import { Category } from "../model/entities/Category";
import { MenuService } from "../model/services/MenuService";

const menuService = new MenuService();

export function useHomeViewModel() {
    const [carregando, setCarregando] = useState(true);
    const [categorias, setCategorias] = useState<Category[]>([]);

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        try {
            setCarregando(true);

            const resultado = await menuService.listarCategorias();

            setCategorias(resultado);
        } finally {
            setCarregando(false);
        }
    }

    return {
        carregando,
        categorias,
    };
}
