import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { user } from '@/types/users.types'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState, AppThunk } from '@/store/store'



interface initialUsersState {
    users:user[]
}

const initialState:initialUsersState= {
  users:[]
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

export const fetchUserId = createAsyncThunk(
  "fetch/userId",
  async(id:string, thunkAPI)=>{
      try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          const data = await res.json()
          return data
      } catch (error) {
         return thunkAPI.rejectWithValue(error)
      }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers:((state,action:PayloadAction<user[]>)=>{
      state.users = action.payload
    }),
    addUserId:((state,action:PayloadAction<user>)=>{
     
      state.users.push(action.payload)
     
    })
    
    
  },
  extraReducers:{
    [HYDRATE]:(state:initialUsersState,action:PayloadAction<initialUsersState>) => {
      return {
        ...state,
        ...action.payload.users,
      };
    }

    
  },
})

export const {addUsers,addUserId} = usersSlice.actions

export default usersSlice.reducer