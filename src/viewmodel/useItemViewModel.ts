import { useEffect, useState } from "react";

import { defaultContainer } from "../di/container";
import { Product } from "../model/entities/Product";
import { GetProductByIdUseCase } from "../model/usecases/GetProductByIdUseCase";

export function useItemViewModel(
  produtoId: string,
  getProductByIdUseCase: GetProductByIdUseCase = defaultContainer.getProductByIdUseCase
) {
  const [carregando, setCarregando] = useState(true);
  const [produto, setProduto] = useState<Product | undefined>(undefined);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function carregarProduto() {
      try {
        setCarregando(true);
        const resultado = await getProductByIdUseCase.execute(produtoId);
        if (isMounted) {
          setProduto(resultado);
        }
      } finally {
        if (isMounted) {
          setCarregando(false);
        }
      }
    }

    carregarProduto();

    return () => {
      isMounted = false;
    };
  }, [produtoId, getProductByIdUseCase]);

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
