import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DList, DListItem, DPaginator } from '@dynamic-framework/ui-react'
import { Product } from '../services/interface'
import ProductCard from './ProductCard'
import useProductEffect from '../services/hooks/useProductEffect'

import usePaginator from '../hooks/usePaginator'
import { useAppSelector } from '../store/hooks'
import { getProducts } from '../store/selectors'

export default function ProductList() {
    const { t } = useTranslation()

    const { loading } = useProductEffect()

    const products = useAppSelector(getProducts)

    // if (loading) {
    //   return <ProductListLoader />;
    // }
    const { callback, currentPage, totalPages } = usePaginator(1)

    return (
        <div
            className={classNames(
                'bg-white d-flex flex-column p-3 rounded gap-3'
            )}
        >
            <DList isHorizontal>
                <div className="row">
                    {products.map((product: Product) => (
                        <DListItem
                            className="col border-0 p-3"
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </DListItem>
                    ))}
                </div>
            </DList>
            <DPaginator
                className="justify-content-center"
                nextLabel={t('pagination.next')}
                page={currentPage}
                total={totalPages}
                onPageChange={(page: number) => callback(page)}
                previousLabel={t('pagination.previous')}
            />
        </div>
    )
}
