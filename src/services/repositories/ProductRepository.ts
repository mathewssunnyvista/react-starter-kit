import type { AxiosResponse, GenericAbortSignal } from "axios";
import ApiClient from "../ApiClient";
import { ApiProduct } from "../api-interface";
import productMapper from "../mappers/productMapper";

export async function list(config?: { abortSignal: GenericAbortSignal }) {
  const response = await ApiClient.request<Array<ApiProduct>>({
    // content/spaces/<space_id>/entries
    url: "/entries",
    method: "GET",
    headers: {
      Prefer: "code=200",
    },
    ...(config?.abortSignal && {
      signal: config.abortSignal,
    }),
  });

  const metaData = response.data.meta;

  const data = await getProductDetail(response);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    data,
    meta: metaData,
  };
}

export async function filteredList(
  urlParams: string,
  config?: { abortSignal: GenericAbortSignal }
) {
  const response = await ApiClient.request<Array<ApiProduct>>({
    // content/spaces/<space_id>/entries?query=sa
    url: `/entries?${urlParams}`,
    method: "GET",
    headers: {
      Prefer: "code=200",
    },
    ...(config?.abortSignal && {
      signal: config.abortSignal,
    }),
  });
  
  const metaData = response.data.meta;

  const data = await getProductDetail(response);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    data,
    meta: metaData,
  };
}

export async function detail(
  id: string,
  config?: { abortSignal: GenericAbortSignal }
) {
  return ApiClient.request<Array<ApiProduct>>({
    // content/spaces/<space_id>/entries?query=sa
    url: `/entry/${id}`,
    method: "GET",
    headers: {
      Prefer: "code=200",
    },
    ...(config?.abortSignal && {
      signal: config.abortSignal,
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //  return data.map((apiProduct: ApiProduct) => productMapper(apiProduct));
}

export async function getProductDetail(response: AxiosResponse<ApiProduct[]>) {
  const apiRequest = [];
  response.data.data.map((item) => {
    apiRequest.push(detail(item.id));
  });
  const result = await Promise.all(apiRequest);
  const data = result.map((res) => res.data);

  return data.map((apiProduct: ApiProduct) => productMapper(apiProduct));
}
