import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse, IUser } from '../../types/user';
import UserService from '../../services/UserService';
import HelperService from '../../services/HelperService';
import { RootState } from '../store';

interface LoginProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginProps, { rejectWithValue }) => {
    try {
      const res = await UserService.login(email, password);
      // res.data returns === accessToken, refreshToken {id, first_name, email, role}
      return res.data;
    } catch (e: unknown) {
      // error string
      rejectWithValue(HelperService.errorToString(e));
    }
  }
);

const initialState = {
  user: {} as IUser,
  status: 'idle', // pending, rejected, success
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as IUser;
      localStorage.removeItem('appToken');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = { ...action.payload?.user };
        localStorage.setItem('appToken', action.payload?.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        console.log('atmete?');
        state.error = action.payload as string;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
