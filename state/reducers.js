import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import {dummyDate} from "./data"
export const counterSlice = createSlice({
  name: 'languages',
  initialState: dummyDate.turkish,
  reducers: {
    showTurkish: () => dummyDate.turkish,
    showDeutsch:  () => dummyDate.deutsch,
    showEnglish:  () => dummyDate.english,
  },
})

// Action creators are generated for each case reducer function
export const { showTurkish, showDeutsch, showEnglish } = counterSlice.actions
export default counterSlice.reducer
