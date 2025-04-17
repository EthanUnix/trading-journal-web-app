import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tradesAPI } from '../../services/api';

// Async thunks
export const fetchTrades = createAsyncThunk(
  'trades/fetchTrades',
  async (params, { rejectWithValue }) => {
    try {
      const response = await tradesAPI.getTrades(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTradeById = createAsyncThunk(
  'trades/fetchTradeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await tradesAPI.getTrade(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTrade = createAsyncThunk(
  'trades/createTrade',
  async (tradeData, { rejectWithValue }) => {
    try {
      const response = await tradesAPI.createTrade(tradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTrade = createAsyncThunk(
  'trades/updateTrade',
  async ({ id, tradeData }, { rejectWithValue }) => {
    try {
      const response = await tradesAPI.updateTrade(id, tradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTrade = createAsyncThunk(
  'trades/deleteTrade',
  async (id, { rejectWithValue }) => {
    try {
      await tradesAPI.deleteTrade(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTradeStats = createAsyncThunk(
  'trades/fetchTradeStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tradesAPI.getTradeStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  trades: [],
  trade: null,
  stats: null,
  pagination: null,
  loading: false,
  error: null,
  success: false
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearTrade: (state) => {
      state.trade = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Trades
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch trades';
      })
      // Fetch Trade By Id
      .addCase(fetchTradeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeById.fulfilled, (state, action) => {
        state.loading = false;
        state.trade = action.payload.data;
      })
      .addCase(fetchTradeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch trade';
      })
      // Create Trade
      .addCase(createTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.trades.unshift(action.payload.data);
        state.success = true;
      })
      .addCase(createTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to create trade';
      })
      // Update Trade
      .addCase(updateTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = state.trades.map(trade => 
          trade._id === action.payload.data._id ? action.payload.data : trade
        );
        state.trade = action.payload.data;
        state.success = true;
      })
      .addCase(updateTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to update trade';
      })
      // Delete Trade
      .addCase(deleteTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = state.trades.filter(trade => trade._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to delete trade';
      })
      // Fetch Trade Stats
      .addCase(fetchTradeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchTradeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch trade stats';
      });
  }
});

export const { clearError, clearSuccess, clearTrade } = tradesSlice.actions;

export default tradesSlice.reducer;
