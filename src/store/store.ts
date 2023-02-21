import {
  Action,ThunkAction, configureStore,} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import users from "../features/usersSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      users,
    },
  });
export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore)
