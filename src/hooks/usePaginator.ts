import queryString from 'query-string'
import {
    useCallback,
    useEffect,
    // useMemo,
    useState,
} from 'react'
import { ProductRepository } from '../services/repositories'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getFilterParams } from '../store/selectors'
import { setProducts } from '../store/slice'
import errorHandler from '../utils/errorHandler'
// Need to check possiility of memeo

export default function usePaginator(peerPage: number) {
    const [loading, setLoading] = useState(true)

    const dispatch = useAppDispatch()

    const filterParams = useAppSelector(getFilterParams)
    const urlParams = queryString.stringify(filterParams)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const callback = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // ?page=${currentPage}&per_page=${peerPage}`); modyo paginatio variables
            const url = urlParams
                ? `${urlParams}&_page=${currentPage}&_limit=${peerPage}`
                : `_page=${currentPage}&_limit=${peerPage}`

            const result = await ProductRepository.filteredList(url)
            dispatch(setProducts(result.data))
            setTotalPages(result.meta.total_pages) // get total from header
        }

        fetchData().catch((error) => {
            // Handle any unhandled promise rejections here
            errorHandler(error)
        })
    }, [currentPage, peerPage, filterParams, urlParams, dispatch])

    // const data = useMemo(() => (
    //   array.slice(start, end)
    // ), [end, array, start]);

    // const totalPages = useMemo(() => getPagesCount(), [getPagesCount]);

    return {
        currentPage,
        totalPages,
        callback,
        loading,
    }
}
