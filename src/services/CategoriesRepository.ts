import { LocalStorageFields } from "@/types/app";

type Category = string;

class CategoriesRepository {
  private static instance: CategoriesRepository;
  private categories: Category[] = [];

  private constructor() {}

  public static getInstance(): CategoriesRepository {
    if (!this.instance) {
      this.instance = new CategoriesRepository();
    }
    return this.instance;
  }

  public addCategory(category: Category): void {
    this.categories.push(category);
    localStorage.setItem(
      LocalStorageFields.Categories,
      JSON.stringify(this.categories)
    );
  }

  public getCategories(): Category[] {
    const categories = localStorage.getItem(LocalStorageFields.Categories);
    this.categories = categories ? JSON.parse(categories) : [];
    return this.categories;
  }

  public removeCategory(category: Category): void {
    this.categories = this.categories.filter(
      (currentCategory) => currentCategory !== category
    );
    localStorage.setItem(
      LocalStorageFields.Categories,
      JSON.stringify(this.categories)
    );
  }
}

export default CategoriesRepository.getInstance();
