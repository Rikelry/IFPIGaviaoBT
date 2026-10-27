import { useEffect, useState } from "react";

import { defaultContainer } from "../di/container";
import { Category } from "../model/entities/Category";
import { GetCategoriesUseCase } from "../model/usecases/GetCategoriesUseCase";

export function useHomeViewModel(
  getCategoriesUseCase: GetCategoriesUseCase = defaultContainer.getCategoriesUseCase
) {
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function carregarCategorias() {
      try {
        setCarregando(true);
        const resultado = await getCategoriesUseCase.execute();
        if (isMounted) {
          setCategorias(resultado);
        }
      } finally {
        if (isMounted) {
          setCarregando(false);
        }
      }
    }

    carregarCategorias();

    return () => {
      isMounted = false;
    };
  }, [getCategoriesUseCase]);

  return {
    carregando,
    categorias,
  };
}
