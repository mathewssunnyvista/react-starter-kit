import { ModalContextProvider } from '@dynamic-framework/ui-react';
import ProductListContainer from './components/ProductListContainer';
import ProductDetailModal from './components/ProductDetailModal';

export default function App() {
  return (
    <div className="border border-1 container my-8 p-8 rounded shadow-sm">

      <ModalContextProvider
        portalName="modalPortal"
        availableModals={{
          productDetail: ProductDetailModal,
        }}
      >
        <ProductListContainer />
      </ModalContextProvider>
    </div>
  );
}