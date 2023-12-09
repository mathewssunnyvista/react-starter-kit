import {
  useCallback,
  useEffect,
  // useMemo,
  useState,
} from "react";
import { ProductRepository } from "../services/repositories";
// import { Activity, Content } from '../services/interface';
// Need to check possiility of memeo

export default function usePaginator(peerPage: number) {
  const [loading, setLoading] = useState(true);

  const [resData, setResData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const callback = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ?page=${currentPage}&per_page=${peerPage}`); modyo paginatio variables
        const url = `_page=${currentPage}&_limit=${peerPage}`;
        const data = await ProductRepository.filteredList(url);
        console.log(data,"data")
        setResData(data); // Adjust the structure based on your API response
        setTotalPages(4); // get total from header
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, peerPage]);

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