import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/store/api/usersApi";

export interface LocalUsersState {
  localUsers: User[];
  searchQuery: string;
  sortBy: "name" | "email" | "company" | null;
  sortOrder: "ascend" | "descend";
}

const initialState: LocalUsersState = {
  localUsers: [],
  searchQuery: "",
  sortBy: null,
  sortOrder: "ascend",
};

const localUsersSlice = createSlice({
  name: "localUsers",
  initialState,
  reducers: {
    addLocalUser: (state, action: PayloadAction<User>) => {
      state.localUsers.push({
        ...action.payload,
        id: Date.now(), 
      });
    },
    updateLocalUser: (state, action: PayloadAction<User>) => {
      const index = state.localUsers.findIndex(
        (u) => u.id === action.payload.id
      );
      if (index !== -1) {
        state.localUsers[index] = action.payload;
      }
    },
    deleteLocalUser: (state, action: PayloadAction<number>) => {
      state.localUsers = state.localUsers.filter(
        (u) => u.id !== action.payload
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortConfig: (
      state,
      action: PayloadAction<{
        sortBy: "name" | "email" | "company" | null;
        sortOrder: "ascend" | "descend";
      }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const {
  addLocalUser,
  updateLocalUser,
  deleteLocalUser,
  setSearchQuery,
  setSortConfig,
} = localUsersSlice.actions;

export default localUsersSlice.reducer;
