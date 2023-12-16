import { useTranslation } from 'react-i18next'
import Filter from './Filter'
import ProductList from './ProductList'

export default function ProductListContainer() {
    const { t } = useTranslation()

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-3">
                    <h1 className="fs-4 fw-bold w-100">
                        {t('products.title')}
                    </h1>
                </div>
            </div>
            <div className="col-lg-4">
                <Filter />
            </div>
            <div className="col-lg-8">
                <ProductList />
            </div>
        </div>
    )
}
