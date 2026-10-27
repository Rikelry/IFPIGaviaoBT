import { Category } from "../entities/Category";
import { MenuRepository } from "../repositories/MenuRepository";

export class GetCategoriesUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(): Promise<Category[]> {
    return this.menuRepository.listarCategorias();
  }
}
