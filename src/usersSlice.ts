import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  status: string;
  searchQuery: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UsersState = {
  users: [],
  status: "succeeded",
  searchQuery: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (
      state,
      action: PayloadAction<UsersState["searchQuery"]>
    ) => {
      state.searchQuery = { ...state.searchQuery, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      console.log('action.payload', action);
      console.log('state', state);
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
  },
});


export const { setSearchQuery } = usersSlice.actions;
export default usersSlice;

