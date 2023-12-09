import { useEffect, useState } from "react";

import { FilterRepository } from "../repositories";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCategories, setSelectedCategory } from "../../store/slice";
import { getCategories } from "../../store/selectors";
import errorHandler from "../../utils/errorHandler";

export default function useCategories() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const data = await FilterRepository.categoryList();
        dispatch(setCategories(data));
        dispatch(setSelectedCategory(data[0]));
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
    categories,
  };
}
