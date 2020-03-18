import { useContext } from 'react';
import { context } from '../store/store';
const useContextHandler = () => {
  const all = useContext(context);
  return all;
};
export default useContextHandler;
