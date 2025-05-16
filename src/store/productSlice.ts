import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "@/lib/mockApi";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  itemsPerPage: number;
  categories: string[]; // ✅ New: Store unique categories
}

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
  searchQuery: "",
  selectedCategory: "",
  currentPage: 1,
  itemsPerPage: 9,
  categories: [], // ✅ Initialize categories
};

// ✅ Async thunk to fetch products
export const loadProducts = createAsyncThunk("products/load", async () => {
  return await fetchProducts();
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;

        // ✅ Extract unique categories from the products
        const categorySet = new Set(action.payload.map((p: Product) => p.category));
        state.categories = Array.from(categorySet) as any;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load products";
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setCurrentPage, addProduct } =
  productSlice.actions;

export default productSlice.reducer;
