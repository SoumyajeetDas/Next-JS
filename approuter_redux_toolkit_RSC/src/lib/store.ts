import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import employeeSlice from './features/employees/employeeSlice';
import studentsSlice from './features/students/studentsSlice';

const store = configureStore({
  reducer: {
    // Add the slice here
    employeeReducer: employeeSlice.reducer,
    studentReducer: studentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const employeeActions = employeeSlice.actions;
export const studentActions = studentsSlice.actions;

export default store;
