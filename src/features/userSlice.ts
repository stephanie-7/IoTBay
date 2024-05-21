import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';
import type { RootState } from '../store/store';

interface UserState {
  user: User | null; 
  logs: { userId: number, loginTime: string, logoutTime: string }[];
}

const initialState: UserState = {
  user: null,
  logs: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      action.payload.loginTime = new Date().toISOString();
      state.user = action.payload;
      state.logs.push({ userId: action.payload.id, loginTime: action.payload.loginTime, logoutTime: '' });
    },
    logout: (state) => {
      if (state.user) {  // Check if state.user is not null
        const logIndex = state.logs.findIndex(log => log.userId === state.user?.id && log.logoutTime === '');
        if (logIndex !== -1) {
          state.logs[logIndex].logoutTime = new Date().toISOString(); // Record logout time
        }
        state.user.logoutTime = new Date().toISOString();
        state.user = null;
      }
    },
  },
});

export const { setCurrentUser,logout  } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
