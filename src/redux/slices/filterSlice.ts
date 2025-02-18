import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  type: string;
  category: string;
  sortBy: string;
}

const initialState: FilterState = {
  type: 'all',
  category: 'all',
  sortBy: 'date_desc',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortType, setCategory, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;