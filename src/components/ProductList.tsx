import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { DList, DListItem, DPaginator } from '@dynamic-framework/ui-react';
import { Product } from '../services/interface';
import ProductCard from './ProductCard';
import useProductEffect from '../services/hooks/useProductEffect';

import usePaginator from '../hooks/usePaginator';

export default function ProductList() {

  const { t } = useTranslation();

 // const { loading, products } = useProductEffect();

 
  const {
    callback,
    currentPage,
    resData,
    totalPages,
  } = usePaginator(1);
  console.log(resData,"hjhjhj")

  return (
    <div
      className={classNames('bg-white d-flex flex-column p-3 rounded gap-3')}
    >
      <DList isHorizontal>
        <div className="row">
          {resData.map((product: Product) => (
            <DListItem className="col border-0" key={product.id}>
              <ProductCard product={product} />
            </DListItem>
          ))}
        </div>
      </DList>
      <DPaginator
        className="justify-content-center"
        nextLabel="Next"
        page={currentPage}
        total={totalPages}
        onPageChange={(page: number) => callback(page)}
        previousLabel="Previous"
      />
    </div>
  );
}
