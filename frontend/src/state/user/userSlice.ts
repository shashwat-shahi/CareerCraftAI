import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserAsync.fulfilled,
        (state, action) => {
          state.value = action.payload.responseBody;
        }
      )
  },
})

export const getUserAsync = createAsyncThunk(
    "user/getUserAsync",
    async (userId: string) => { 
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getUser/${userId}`, {credentials: 'include'})
        const data = await response.json()
        return data;
    }
  )


export default userSlice.reducer;