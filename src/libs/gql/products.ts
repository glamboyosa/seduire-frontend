export interface GetProducts_ProductTypes {
  __typename: 'ProductType';
  _id: string;
  productType: string;
}
export interface GetProducts_Products {
  __typename: 'Item';
  _id: string;
  description: string;
  type: GetProducts_ProductTypes;
  sex: string;
  size: string[];
  price: number;
  count: number;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface getProducts {
  getProducts: GetProducts_Products[];
}
export interface getCategory {
  getCategory: GetProducts_Products[];
}
export interface getProductVariables {
  productId: string;
}
export interface getCategoryVariables {
  sex: string;
}
export interface createProductsVariables {
  description: string;
  creator: string;
  type: string;
  size: [string];
  sex: string;
  price: number;
  mediaUrl: string;
}
