import type { GenericAbortSignal } from "axios";
import ApiClient from "../ApiClient";
import { ApiProduct } from "../api-interface";
import productMapper from "../mappers/productMapper";

export async function list(config?: { abortSignal: GenericAbortSignal }) {
  const { data } = await ApiClient.request<Array<ApiProduct>>({
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data.map((apiProduct: ApiProduct) => productMapper(apiProduct));
}

export async function filteredList(
  urlParams: string,
  config?: { abortSignal: GenericAbortSignal }
) {

  const { data } = await ApiClient.request<Array<ApiProduct>>({
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
  const apiRequest = [];
  data.map((item) => {
    apiRequest.push(detail(item.id));
  });
  const res = await Promise.all(apiRequest);
  const dataNew = res.map((res) => res.data);
  console.log(dataNew.flat(),"dataaaaaaaaa")
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return dataNew.map((apiProduct: ApiProduct) => productMapper(apiProduct));
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
