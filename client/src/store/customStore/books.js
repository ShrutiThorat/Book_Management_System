import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialBooksState = {
  bookList: null,
  updatedBook: null,
  deleteBookStatus: null,
  addBokStatus: null,
};

let API_URL = 'http://localhost:3080/api/books';

const bookSlice = createSlice({
  name: 'books',
  initialState: initialBooksState,
  reducers: {
    booksCollection(state, action) {
      state.bookList = action.payload;
    },
    updatedBookCollection(state, action) {
      state.updatedBook = action.payload;
    },
    deleteBook(state, action) {
      state.deleteBookStatus = action.payload;
    },
    addBook(state, action) {
      state.addBokStatus = action.payload;
    },
  },
});

export const fetchBooksList = () => {
  return (dispatch) => {
    axios
      .request({
        method: 'GET',
        url: API_URL,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        dispatch(bookSlice.actions.booksCollection(response?.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const addNewBook = (data) => {
  return (dispatch) => {
    if (data) {
      axios
        .request({
          method: 'POST',
          url: API_URL,
          headers: { 'Content-Type': 'multipart/form-data' },
          data: data?.formData,
        })
        .then((response) => {
          dispatch(bookSlice.actions.addBook(response?.status));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else dispatch(bookSlice.actions.addBook(null));
  };
};

export const updateBook = (data) => {
  return (dispatch) => {
    if (data) {
      axios
        .request({
          method: 'PUT',
          url: `http://localhost:3080/api/books/${data?.id}`,
          headers: { 'Content-Type': 'multipart/form-data' },
          data: data?.formData,
        })
        .then((response) => {
          dispatch(bookSlice.actions.updatedBookCollection(response?.status));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else dispatch(bookSlice.actions.updatedBookCollection(null));
  };
};

export const deleteBook = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .request({
          method: 'DELETE',
          url: `${API_URL}/${id}`,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          dispatch(bookSlice.actions.deleteBook(response.status));
        })
        .catch(function (error) {
          dispatch(bookSlice.actions.deleteBook('error'));
        });
    } else dispatch(bookSlice.actions.deleteBook(null));
  };
};

export default bookSlice.reducer;
