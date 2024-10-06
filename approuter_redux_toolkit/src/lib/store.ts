import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import employeeSlice from './features/employees/employeeSlice';
import studentsSlice from './features/students/studentsSlice';
/*********************************************
 * Global store cannot be used in Next JS
 *********************************************/

// const store = configureStore({
//   reducer: {
//     // Add the slice here
//     employeeReducer: employeeSlice.reducer,
//     studentReducer: studentsSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const employeeActions = employeeSlice.actions;
// export const studentActions = studentsSlice.actions;

// export default store;

// This will create and provide a new store for every request made
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the slice here
      employeeReducer: employeeSlice.reducer,
      studentReducer: studentsSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const employeeActions = employeeSlice.actions;
export const studentActions = studentsSlice.actions;
