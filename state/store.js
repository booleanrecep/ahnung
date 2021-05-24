import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './reducers'
export default configureStore({
  reducer: languageReducer,
})
