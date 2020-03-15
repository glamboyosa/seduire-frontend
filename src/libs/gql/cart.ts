export interface GetCartProducts_ProductTypes {
  __typename: 'ProductType';
  _id: string;
  productType: string;
}
export interface GetCartProducts_Products {
  __typename: 'Item';
  _id: string;
  description: string;
  type: GetCartProducts_ProductTypes;
  sex: string;
  size: string[];
  price: number;
  count: number;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface getCart {
  getCart: GetCartProducts_Products[];
}
export interface addToCart {
  addToCart: GetCartProducts_Products;
}
export interface removeFromCart {
  removeFromCart: GetCartProducts_Products;
}
export interface addToCartVariables {
  item: string;
  size: string;
}
export interface removeFromCartVariables {
  item: string;
}
