import queryString from "query-string";
import {
  useCallback,
  useEffect,
  // useMemo,
  useState,
} from "react";
import { ProductRepository } from "../services/repositories";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getFilterParams } from "../store/selectors";
import { setProducts } from "../store/slice";
// import { Activity, Content } from '../services/interface';
// Need to check possiility of memeo

export default function usePaginator(peerPage: number) {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const filterParams = useAppSelector(getFilterParams);
  const urlParams = queryString.stringify(filterParams);

  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const callback = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ?page=${currentPage}&per_page=${peerPage}`); modyo paginatio variables

        const url = urlParams
          ? `${urlParams}&_page=${currentPage}&_limit=${peerPage}`
          : `_page=${currentPage}&_limit=${peerPage}`;

        const result = await ProductRepository.filteredList(url);
        setResData(result.data); // Adjust the structure based on your API response
        dispatch(setProducts(result.data));
        setTotalPages(result.meta.total_pages); // get total from header
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, peerPage, filterParams]);

  // const data = useMemo(() => (
  //   array.slice(start, end)
  // ), [end, array, start]);

  // const totalPages = useMemo(() => getPagesCount(), [getPagesCount]);

  return {
    currentPage,
    totalPages,
    resData,
    callback,
  };
}
