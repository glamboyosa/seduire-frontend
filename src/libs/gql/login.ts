export interface login_login {
  __typename: 'LoginResponse';
  firstName: string;
  token: string;
  exp: number;
  expDate: string;
}
export interface login {
  login: login_login;
}
export interface login_variables {
  email: string;
  password: string;
}
