import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userState: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },

  },
})

export const { userState } = userSlice.actions

export default userSlice.reducer