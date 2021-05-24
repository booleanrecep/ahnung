import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


import {dummyDate} from "./data"

export const getInitialData= ()=>{
  return async (dispatch)=>{
      try{
        const res = await fetch("http://localhost:3000/api/articles");
        const json = await res.json();
          dispatch({
              type:"GET_DATA",
              notes:json
          })
      }catch(err){
          console.log(err)
      }
  }
}
const fetchData = createAsyncThunk(
  'data',
  async () => {
    const response = await fetch("http://localhost:3000/api/articles");

    return response.data
  }
)
export const languageSlice = createSlice({
  name: 'languages',
  initialState: dummyDate.turkish,

  reducers: {
    showTurkish: () => dummyDate.turkish,
    showDeutsch:  () => dummyDate.deutsch,
    showEnglish:  () => dummyDate.english,
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchData.fulfilled]: (state, action) => {
      console.log(state)
      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { showTurkish, showDeutsch, showEnglish} = languageSlice.actions
export default languageSlice.reducer