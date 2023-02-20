import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { user } from '@/types/users.types'
import { HYDRATE } from 'next-redux-wrapper'



interface InitialUsersState {
    users:user[]
}
export const fetchUsers = createAsyncThunk(
    "fetch/users",
    async(_, thunkAPI)=>{
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await res.json()
            return data
        } catch (error) {
           return thunkAPI.rejectWithValue(error)
        }
    }
);


const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    users:[]
  },
  reducers: {
  },
  extraReducers: {
    [HYDRATE]:(state:any, action:any) => {
        console.log('HYDRATE', state, action.payload);
        return {
          ...state,
          ...action.payload,
        };
      }
  },
})

export default counterSlice.reducer