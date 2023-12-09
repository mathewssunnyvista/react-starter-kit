import type { Product } from "../interface";
import type { ApiProduct } from "../api-interface";

export default function productMapper(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.json?.fields.Price,
    description: apiProduct.json?.fields.Description,
    image: apiProduct.json?.fields.Image,
  };
}
