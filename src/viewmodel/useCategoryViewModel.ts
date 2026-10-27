import { useEffect, useState } from "react";

import { defaultContainer } from "../di/container";
import { Product } from "../model/entities/Product";
import { GetProductsByCategoryUseCase } from "../model/usecases/GetProductsByCategoryUseCase";

function obterTituloCategoria(categoriaId?: string): string {
  if (categoriaId === "bebidas") {
    return "Bebidas";
  }
  if (categoriaId === "comidas") {
    return "Comidas";
  }
  return "Cardápio";
}

export function useCategoryViewModel(
  categoriaId: string,
  getProductsByCategoryUseCase: GetProductsByCategoryUseCase = defaultContainer.getProductsByCategoryUseCase
) {
  const [carregando, setCarregando] = useState(true);
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function carregarProdutos() {
      try {
        setCarregando(true);
        const resultado =
          await getProductsByCategoryUseCase.execute(categoriaId);
        if (isMounted) {
          setProdutos(resultado);
        }
      } finally {
        if (isMounted) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      isMounted = false;
    };
  }, [categoriaId, getProductsByCategoryUseCase]);

  const nomeCategoria = obterTituloCategoria(categoriaId);

  return {
    carregando,
    produtos,
    nomeCategoria,
  };
}
