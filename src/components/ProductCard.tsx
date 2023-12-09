import {
  DButton,
  DCard,
  DCardBody,
  DCardFooter,
  DCardHeader,
  DCarousel,
  DCarouselSlide,
  DCurrencyText,
  useModalContext,
} from '@dynamic-framework/ui-react';
import { Product } from '../services/interface';

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  

  // const { openModal } = useModalContext();

  // const openActivityDetail = () => {
  //   console.log(product,"dd")
  //   openModal("productDetail", { payload: { product } });
  // };


  return (
    <DCard
      style={{
        width: 240,
      }}
    >
      <DCardHeader>
        <h6 className="card-title">{product.name}</h6>
      </DCardHeader>

      <DCarousel
        options={{
          gap: "1rem",
          padding: "0.5rem",
          perPage: 1,
          updateOnMove: true,
          width: 540,
        }}
      >
        {product?.image?.map((image: string, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <DCarouselSlide key={index}>
            <div className="d-flex flex-column rounded text-center">
              <img src={image.url} alt={product.name} />
            </div>
          </DCarouselSlide>
        ))}
      </DCarousel>
      
      <DCardFooter className="d-flex justify-content-end mt-6">

      <div className="col align-self-center">
        <DCurrencyText value={product.price} />
      </div>

      <div className="col">
        <DButton
          iconEnd="chevron-right"
          text="View"
          theme="secondary"
          type="button"
          variant="link"
          // onClick={() => openActivityDetail()}
        />
      </div>
      </DCardFooter>
    </DCard>
  );
}
