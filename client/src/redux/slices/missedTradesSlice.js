import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { missedTradesAPI } from '../../services/api';

// Async thunks
export const fetchMissedTrades = createAsyncThunk(
  'missedTrades/fetchMissedTrades',
  async (params, { rejectWithValue }) => {
    try {
      const response = await missedTradesAPI.getMissedTrades(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMissedTradeById = createAsyncThunk(
  'missedTrades/fetchMissedTradeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await missedTradesAPI.getMissedTrade(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createMissedTrade = createAsyncThunk(
  'missedTrades/createMissedTrade',
  async (tradeData, { rejectWithValue }) => {
    try {
      const response = await missedTradesAPI.createMissedTrade(tradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMissedTrade = createAsyncThunk(
  'missedTrades/updateMissedTrade',
  async ({ id, tradeData }, { rejectWithValue }) => {
    try {
      const response = await missedTradesAPI.updateMissedTrade(id, tradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMissedTrade = createAsyncThunk(
  'missedTrades/deleteMissedTrade',
  async (id, { rejectWithValue }) => {
    try {
      await missedTradesAPI.deleteMissedTrade(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMissedTradeStats = createAsyncThunk(
  'missedTrades/fetchMissedTradeStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await missedTradesAPI.getMissedTradeStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  missedTrades: [],
  missedTrade: null,
  stats: null,
  pagination: null,
  loading: false,
  error: null,
  success: false
};

const missedTradesSlice = createSlice({
  name: 'missedTrades',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearMissedTrade: (state) => {
      state.missedTrade = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Missed Trades
      .addCase(fetchMissedTrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissedTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.missedTrades = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMissedTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch missed trades';
      })
      // Fetch Missed Trade By Id
      .addCase(fetchMissedTradeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissedTradeById.fulfilled, (state, action) => {
        state.loading = false;
        state.missedTrade = action.payload.data;
      })
      .addCase(fetchMissedTradeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch missed trade';
      })
      // Create Missed Trade
      .addCase(createMissedTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMissedTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.missedTrades.unshift(action.payload.data);
        state.success = true;
      })
      .addCase(createMissedTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to create missed trade';
      })
      // Update Missed Trade
      .addCase(updateMissedTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMissedTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.missedTrades = state.missedTrades.map(trade => 
          trade._id === action.payload.data._id ? action.payload.data : trade
        );
        state.missedTrade = action.payload.data;
        state.success = true;
      })
      .addCase(updateMissedTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to update missed trade';
      })
      // Delete Missed Trade
      .addCase(deleteMissedTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteMissedTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.missedTrades = state.missedTrades.filter(trade => trade._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteMissedTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to delete missed trade';
      })
      // Fetch Missed Trade Stats
      .addCase(fetchMissedTradeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissedTradeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchMissedTradeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch missed trade stats';
      });
  }
});

export const { clearError, clearSuccess, clearMissedTrade } = missedTradesSlice.actions;

export default missedTradesSlice.reducer;
