import { DInput } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  value?: string;
  onChange: Dispatch<SetStateAction<string | undefined>>;
};

export default function SearchInput({ value, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <div>
      <DInput
        id="searchInput"
        label={t('filter.searchInput.label')}
        placeholder={t('filter.searchInput.placeholder')}
        type="text"
        onChange={(newValue) => onChange(newValue)}
        value={value}
      />
    </div>
  );
}