import type { Category } from "../interface";
import type { ApiCategory } from "../api-interface";

export default function categoryMapper(apiCategory: ApiCategory): Category {
  return {
    value: apiCategory.id,
    label: apiCategory.name,
  };
}
