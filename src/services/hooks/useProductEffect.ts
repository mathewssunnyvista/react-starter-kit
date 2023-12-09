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
        const data = await ProductRepository.list();
        console.log(data,"ssss")

        // Getting entry at first and send other request to get attributes.
        // const apiRequest = [];
        // data.map((item) => {
        //   apiRequest.push(ProductRepository.detail(item.id));
        // });

        // const res = await Promise.all(apiRequest);
        // const dataNew = res.map((res) => res);
        // console.log(dataNew.flat().slice(0,4));

        // dispatch(setProducts(dataNew.flat().slice(0,4)));
        dispatch(setProducts(data));
        setLoading(false);
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
