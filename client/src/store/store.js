import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './customStore/books';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
