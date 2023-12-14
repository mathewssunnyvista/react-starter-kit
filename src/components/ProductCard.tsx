import {
  DButton,
  DCard,
  DCardBody,
  DCardFooter,
  DCardHeader,
  DCarousel,
  DCarouselSlide,
  DCurrencyText,
  DIcon,
  useModalContext,
} from "@dynamic-framework/ui-react";
import { Product } from "../services/interface";

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
        width: 180,
      }}
    >
      <DCardBody>
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
     </DCardBody>

 

      <DCardFooter className="d-flex mt-6">
        <div class="container">
          <div class="row">
            <div class="col d-flex flex-row">
               <h6 className="card-title text-capitalize">{product.name}</h6>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex flex-row">
              <DIcon icon="star-fill" size="1rem" />
              <DIcon icon="star-fill" size="1rem" />
              <DIcon icon="star-half" size="1rem" />
              <DIcon icon="star" size="1rem" />
              <DIcon icon="star" size="1rem" />
            </div>
          </div>
          <div class="row">
            <div class="col d-flex flex-row justify-content-between">
              <DCurrencyText value={product.price} className="mt-2" />
              <DButton
                iconEnd="chevron-right"
                text="View"
                theme="secondary"
                type="button"
                variant="link"
                // onClick={() => openActivityDetail()}
              />
            </div>
          </div>
        </div>
        {/* <div class="row">
        <div class="col"> sss </div>
      </div>
      <div class="row">
          <div class="col"> fff </div>
          <div class="col"> ggg </div>
      </div> */}

        {/* <div className="col align-self-center">
        <DCurrencyText value={product.price} />
      </div>
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
      </div> */}
      </DCardFooter>
    </DCard>
  );
}
