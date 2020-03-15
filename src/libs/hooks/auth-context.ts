import { useReducer } from 'react';
const initialState = { isAuth: false, token: '', expsIn: '', expDate: '' };
type AppState = typeof initialState;
type Action =
  | {
      type: 'AUTHENTICATED';
      token: string | null;
      expsIn: string | null;
      expDate: string | null;
    }
  | { type: 'UNAUTHENTICATED' };
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'AUTHENTICATED':
      return {
        ...state,
        isAuth: true,
        token: action.token!,
        expsIn: action.expsIn!,
        expDate: action.expDate!
      };
    case 'UNAUTHENTICATED':
      return {
        ...state,
        isAuth: false,
        token: '',
        expsIn: ''
      };

    default:
      return state;
  }
};

const useAuthState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const logout = () => dispatch({ type: 'UNAUTHENTICATED' });
  const checkTimeLeft = (expsIn: number) =>
    setTimeout(() => logout(), expsIn * 1000);
  const checkAuthState = () => {
    if ((state.token = '')) {
      logout();
      localStorage.removeItem('Auth Token');
      localStorage.removeItem('expsIn');
      localStorage.removeItem('expDate');
    } else {
      const expiryDate = new Date(state.expDate);
      const currentDate = new Date();
      if (currentDate > expiryDate) {
        checkTimeLeft(currentDate.getTime() - expiryDate.getTime() / 1000);
      } else {
        logout();
      }
    }
  };
  // dispatch may not work across all components. Do well to set token to localStorage or something.
  // then in the app simply just call these functions and use localStorage.get 4 token & exp in useEffect
  // don't really care about isAuth bc i'll write that to be !!token in the cache, same for token.
  return {
    checkAuthState,
    dispatch,
    token: state.token,
    expiry: state.expsIn
  };
};
export default useAuthState;
