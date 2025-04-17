import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { brokerAccountsAPI } from '../../services/api';

// Async thunks
export const fetchBrokerAccounts = createAsyncThunk(
  'brokerAccounts/fetchBrokerAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.getBrokerAccounts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBrokerAccountById = createAsyncThunk(
  'brokerAccounts/fetchBrokerAccountById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.getBrokerAccount(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBrokerAccount = createAsyncThunk(
  'brokerAccounts/createBrokerAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.createBrokerAccount(accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBrokerAccount = createAsyncThunk(
  'brokerAccounts/updateBrokerAccount',
  async ({ id, accountData }, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.updateBrokerAccount(id, accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBrokerAccount = createAsyncThunk(
  'brokerAccounts/deleteBrokerAccount',
  async (id, { rejectWithValue }) => {
    try {
      await brokerAccountsAPI.deleteBrokerAccount(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const syncBrokerAccount = createAsyncThunk(
  'brokerAccounts/syncBrokerAccount',
  async (id, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.syncBrokerAccount(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSyncHistory = createAsyncThunk(
  'brokerAccounts/fetchSyncHistory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await brokerAccountsAPI.getSyncHistory(id);
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  brokerAccounts: [],
  brokerAccount: null,
  syncHistory: {},
  loading: false,
  error: null,
  success: false,
  syncInProgress: false
};

const brokerAccountsSlice = createSlice({
  name: 'brokerAccounts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearBrokerAccount: (state) => {
      state.brokerAccount = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Broker Accounts
      .addCase(fetchBrokerAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrokerAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.brokerAccounts = action.payload.data;
      })
      .addCase(fetchBrokerAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch broker accounts';
      })
      // Fetch Broker Account By Id
      .addCase(fetchBrokerAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrokerAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.brokerAccount = action.payload.data;
      })
      .addCase(fetchBrokerAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch broker account';
      })
      // Create Broker Account
      .addCase(createBrokerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBrokerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.brokerAccounts.push(action.payload.data);
        state.success = true;
      })
      .addCase(createBrokerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to create broker account';
      })
      // Update Broker Account
      .addCase(updateBrokerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBrokerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.brokerAccounts = state.brokerAccounts.map(account => 
          account._id === action.payload.data._id ? action.payload.data : account
        );
        state.brokerAccount = action.payload.data;
        state.success = true;
      })
      .addCase(updateBrokerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to update broker account';
      })
      // Delete Broker Account
      .addCase(deleteBrokerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBrokerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.brokerAccounts = state.brokerAccounts.filter(account => account._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBrokerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to delete broker account';
      })
      // Sync Broker Account
      .addCase(syncBrokerAccount.pending, (state) => {
        state.syncInProgress = true;
        state.error = null;
      })
      .addCase(syncBrokerAccount.fulfilled, (state) => {
        state.syncInProgress = false;
        state.success = true;
      })
      .addCase(syncBrokerAccount.rejected, (state, action) => {
        state.syncInProgress = false;
        state.error = action.payload ? action.payload.error : 'Failed to sync broker account';
      })
      // Fetch Sync History
      .addCase(fetchSyncHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSyncHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.syncHistory[action.payload.id] = action.payload.data.data;
      })
      .addCase(fetchSyncHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Failed to fetch sync history';
      });
  }
});

export const { clearError, clearSuccess, clearBrokerAccount } = brokerAccountsSlice.actions;

export default brokerAccountsSlice.reducer;
