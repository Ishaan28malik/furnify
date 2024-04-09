import PRODUCTS from './products.json';
import CATEGORIES from './categories.json';

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  thumbnail: string;
};

export type CartItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  thumbnail: string;
  quantity: number
}

export type CategoryType = {
  id: number;
  name: string;
  imageUrl: string;
};

export default {
  getProducts: (): ProductType[] => PRODUCTS,
  getProduct: (productID: number): ProductType | undefined =>
    PRODUCTS.find(product => product.id === productID),

  getCategories: () => CATEGORIES,
  getCategory: (categoryID: number): CategoryType | undefined => {
    return CATEGORIES.find(cat => cat.id === categoryID);
  },
};
