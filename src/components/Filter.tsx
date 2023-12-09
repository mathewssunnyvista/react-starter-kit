import { DButton } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProducts } from '../store/slice';
import SearchInput from './SearchInput';
import { ProductRepository } from '../services/repositories';
import useCategories from '../services/hooks/useCategories';
import FilterLoader from './loaders/FilterLoader';
import SearchByCategory from './SearchByCategory';
import { getSelectedCategory } from '../store/selectors';

export default function Filter() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { loading } = useCategories();
  const selectedCategory = useAppSelector(getSelectedCategory);
  const [searchKey, setSearchKey] = useState<string>();

  if (loading) {
    return <FilterLoader />;
  }
  
  const searchProducts = async () => {
    const params = {};
    // params.query = searchKey -- for modyo real api
    // params.category_id = categoryId -- for modyo real api
    params.name_like = searchKey;
    params.category_id = selectedCategory?.value;

    const urlParams = queryString.stringify(params);
    const data = await ProductRepository.filteredList(urlParams);

    dispatch(setProducts(data));
  };

  return (
    <div className="bg-light d-flex flex-column p-3 rounded gap-3 quick-transfer">
      <h3 className="fs-5 fw-bold mx-2">{t('products.filter')}</h3>

      <SearchInput value={searchKey} onChange={setSearchKey} />

      <SearchByCategory />

      <DButton
        text={t('products.apply')}
        isPill
        theme="primary"
        iconEnd="search"
        onClick={searchProducts}
      />
    </div>
  );
}
