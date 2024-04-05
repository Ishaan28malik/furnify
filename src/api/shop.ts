import _products from './products.json';
import _categories from './categories.json';

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  thumbnail: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export default {
  getProducts: (): ProductType[] => _products,
  getProduct: (productID: number): ProductType | undefined =>
    _products.find(product => product.id === productID),

  getCategories: () => _categories,
  getCategory: (categoryID: number): CategoryType | undefined =>
    _categories.find(cat => cat.id === categoryID),
};
