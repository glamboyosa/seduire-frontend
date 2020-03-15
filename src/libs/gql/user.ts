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
export interface user_user {
  __typename: 'User';
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cart: GetCartProducts_Products[] | null;
}
export interface user {
  createUser: user_user;
}
export interface user_variables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
