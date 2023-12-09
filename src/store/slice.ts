import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Product } from "../services/interface";

export type WidgetState = {
  products: Array<Product>;
  filterProducts: Array<Product>;
  categories: Array<Category>;
  selectedCategory?: Category;
};

const initialState: WidgetState = {
  products: [],
  filterProducts: [],
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
  },
});

export const { setProducts, setCategories, setSelectedCategory } =
  slice.actions;
export default slice.reducer;
