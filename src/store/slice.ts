import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Product, FilterParams } from "../services/interface";

export type WidgetState = {
  products: Array<Product>;
  filterParams: FilterParams;
  categories: Array<Category>;
  selectedCategory?: Category;
};

const initialState: WidgetState = {
  products: [],
  filterParams: {},
  categories: [],
} as WidgetState;

const slice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    setCategories(state, action: PayloadAction<Array<Category>>) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
    },
    setFilterParams(state, action: PayloadAction<FilterParams>) {
      state.filterParams = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setSelectedCategory,
  setFilterParams,
} = slice.actions;
export default slice.reducer;
