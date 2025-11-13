import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProperties, getPropertyById } from "@/api/properties";
import type {
  PropertyResponseDto,
  PropertyResponseDetailDto,
  PropertyFilters,
} from "@/types/property";

interface PropertiesState {
  properties: PropertyResponseDto[];
  selectedProperty: PropertyResponseDetailDto | null;
  filters: PropertyFilters;
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  properties: [],
  selectedProperty: null,
  filters: {},
  loading: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (filters: PropertyFilters = {}, { rejectWithValue }) => {
    try {
      const data = await getProperties(filters);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch properties"
      );
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  "properties/fetchPropertyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getPropertyById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch property"
      );
    }
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<PropertyFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    selectProperty: (
      state,
      action: PayloadAction<PropertyResponseDetailDto | null>
    ) => {
      state.selectedProperty = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  selectProperty,
  clearSelectedProperty,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
