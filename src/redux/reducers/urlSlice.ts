import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    SpringbaseUrl: 'http://localhost:9000',     // 개발용
    //SpringbaseUrl: 'http://3.35.170.116',     // 서버용

    PythonbaseUrl: 'http://localhost:3000',      // 개발용
    // PythonbaseUrl: 'https://3.35.170.116',   // 서버용
  },
  reducers: {
    setSpringBaseUrl: (state, action) => {
      state.SpringbaseUrl = action.payload;
    },
    setPythonBaseUrl: (state, action) => {
      state.PythonbaseUrl = action.payload;
    }
  }
});

export const { setSpringBaseUrl, setPythonBaseUrl } = urlSlice.actions;
export default urlSlice.reducer;