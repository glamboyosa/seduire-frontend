import { useEffect, useState } from 'react';

const useCartCalculator = (
  content?: {
    mediaUrl: string;
    price: number;
    description: string;
  }[]
) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    console.log('Hi I re-render');
    if (typeof content !== 'undefined') {
      console.log("Ain't undefined");
      const cartCount = content
        .map(cartItem => cartItem.price)
        .reduce((count, el) => {
          return count + el;
        }, 0);
      setCartCount(cartCount);
    }
  }, [content]);

  return { cartCount };
};
export default useCartCalculator;
