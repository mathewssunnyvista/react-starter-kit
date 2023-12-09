import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { Product } from "../services/interface";

import type { RootState } from "./store";
const getState = (state: RootState) => state.widget;

export const getProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.products
);

export const getCategories = createDraftSafeSelector(
  getState,
  (widget) => widget.categories
);

export const getSelectedCategory = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedCategory
);

export const getFilterProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.filterProducts
);

export const getFilteredActivities = createDraftSafeSelector(
  getProducts,
  getFilterProducts,
  (products, filter) => {
    if (filter.query === "") {
      return products;
    }

    return products.filter(({ name }: Product) =>
      name.toLowerCase().includes(filter.query)
    );
  }
);
