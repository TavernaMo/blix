import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAsyncAlbumListCallback } from "../API/AlbumsApi";
export const getAlbumDataAsync = createAsyncThunk(
  "albumSlice/getAlbumDataAsync",
  async () => getAsyncAlbumListCallback()
);

const albumSlice = createSlice({
  name: "tickets",
  initialState: {
    albumData: [],
  },
  extraReducers: {
    [getAlbumDataAsync.fulfilled]: (state, action) => {
      state.albumData = action.payload;
    },
  },
});

export default albumSlice.reducer;
