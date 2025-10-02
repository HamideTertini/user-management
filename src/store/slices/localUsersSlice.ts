import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/usersApi';

interface LocalUsersState {
  localUsers: User[];
  searchQuery: string;
  sortBy: 'name' | 'email' | 'company' | null;
  sortOrder: 'ascend' | 'descend';
}

const initialState: LocalUsersState = {
  localUsers: [],
  searchQuery: '',
  sortBy: null,
  sortOrder: 'ascend',
};

const localUsersSlice = createSlice({
  name: 'localUsers',
  initialState,
  reducers: {
    addLocalUser: (state, action: PayloadAction<User>) => {
      state.localUsers = [action.payload, ...state.localUsers];
    },
    updateLocalUser: (state, action: PayloadAction<User>) => {
      const index = state.localUsers.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.localUsers[index] = action.payload;
      }
    },
    deleteLocalUser: (state, action: PayloadAction<number>) => {
      state.localUsers = state.localUsers.filter(user => user.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<{ sortBy: 'name' | 'email' | 'company' | null; sortOrder: 'ascend' | 'descend' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { addLocalUser, updateLocalUser, deleteLocalUser, setSearchQuery, setSortConfig } = localUsersSlice.actions;
export default localUsersSlice.reducer;
