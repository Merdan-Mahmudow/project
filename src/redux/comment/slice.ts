import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentType } from './types'

const initialState: CommentType = {
  comment: '',
}

export const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    commentState: (state, action: PayloadAction<any>) => {
      state.comment = action.payload
    },

  },
})

export const { commentState } = CommentSlice.actions

export default CommentSlice.reducer