import { DInputSelect } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import { Category } from '../services/interface';
import { getCategories } from '../store/selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedCategory } from '../store/slice';

export default function SearchByCategory() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);

  const handleChange = (category: Category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div>
      <DInputSelect
        id="componentId1"
        label={t('filter.searchCategory.label')}
        options={categories}
        onChange={(newValue) => handleChange(newValue as Category)}
      />
    </div>
  );
}
