import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import spaceXApi from '../../common/apis/spaceXApi';

const initialState = {
  launches: [],
  isLoading: false,
};

export const fetchAsyncLaunches = createAsyncThunk(
  'launches/fetchAsyncLaunches',
  async () => {
    const response = await spaceXApi.get(`launches?order=desc`).catch((err) => {
      console.log('Err :', err);
    });

    return response.data;
  }
);

const launchSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncLaunches.pending]: (state) => {
      console.log('Pending');
      return { ...state, isLoading: true };
    },

    [fetchAsyncLaunches.fulfilled]: (state, { payload }) => {
      console.log('Launches fetched successfully: ', payload);
      return { ...state, launches: payload, isLoading: false };
    },
    [fetchAsyncLaunches.rejected]: () => {
      console.log('Rejected');
    },
  },
});

// getters
export const getAllLaunches = (state) => state.launches.launches;
export const getIsLoading = (state) => state.launches.isLoading;

export default launchSlice.reducer;
