import { useEffect, useState } from "react";

import { ProductRepository } from "../repositories";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProducts } from "../../store/slice";
import { getProducts } from "../../store/selectors";
import errorHandler from "../../utils/errorHandler";

export default function useProductEffect() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const result = await ProductRepository.list();
        setLoading(false);
        dispatch(setProducts(result.data));
      } catch (error) {
        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    products,
  };
}
