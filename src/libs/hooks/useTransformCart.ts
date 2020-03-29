import { useState, useEffect } from 'react';
const useTransformCart = (
  content?: {
    mediaUrl: string;
    price: number;
    description: string;
    count: number;
  }[]
) => {
  const [priceArray, setPriceArray] = useState<number[]>();
  useEffect(() => {
    setPriceArray(content?.map(el => el.price));
  }, [content]);
  return { priceArray };
};
export default useTransformCart;
