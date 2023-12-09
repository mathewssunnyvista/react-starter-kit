import type { GenericAbortSignal } from "axios";
import ApiClient from "../ApiClient";
import { ApiCategory } from "../api-interface";
import categoryMapper from "../mappers/categoryMapper";

export async function categoryList(config?: {
  abortSignal: GenericAbortSignal;
}) {
  const { data } = await ApiClient.request<Array<ApiCategory>>({
    // content/spaces/<space_id>/categories
    url: "/categories",
    method: "GET",
    headers: {
      Prefer: "code=200",
    },
    ...(config?.abortSignal && {
      signal: config.abortSignal,
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data.map((apiCategory: ApiCategory) => categoryMapper(apiCategory));
}
