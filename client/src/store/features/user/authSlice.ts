import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import HelperService from '../../../services/HelperService';
import { RootState } from '../../store';

import { jwtDecode } from 'jwt-decode';

interface AuthState {
  user: { id: string | null; role: string | null };
  accessToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const token = localStorage.getItem('accessToken');

const restoredUser = { id: null, role: null };

if (token) {
  const { id, role } = jwtDecode(token);
  restoredUser.id = id;
  restoredUser.role = role;
}

const initialState: AuthState = {
  user: { id: restoredUser.id, role: restoredUser.role },
  accessToken: null,
  status: 'idle',
  error: null,
};

// Prisijungimas
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('accessToken', response.accessToken);

      return response;
    } catch (error: unknown) {
      return rejectWithValue(HelperService.errorToString(error));
    }
  }
);

// Atsijungimas
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('accessToken');
    } catch (error: unknown) {
      return rejectWithValue(HelperService.errorToString(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = { id: null, role: null };
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.accessToken = null;
        state.user = { id: null, role: null };
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
