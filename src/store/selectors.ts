import { createDraftSafeSelector } from "@reduxjs/toolkit";
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

export const getFilterParams = createDraftSafeSelector(
  getState,
  (widget) => widget.filterParams
);
