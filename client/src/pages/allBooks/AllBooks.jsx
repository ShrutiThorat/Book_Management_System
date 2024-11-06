import './AllBooks.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {
  addNewBook,
  deleteBook,
  fetchBooksList,
  updateBook,
} from '../../store/customStore/books';
import Cards from '../../container/cards/Cards';
import AddNewModal from '../../container/modal/AddBookModal';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

let authors = [];
let genres = [];

const AllBooks = () => {
  const dispatch = useDispatch();
  const [booksList, setBooksList] = useState([]);
  const [updateModal, setUpdateModal] = useState({ flag: false, book: null });
  const [updatedData, setUpdatedData] = useState({
    bookName: null,
    image: null,
    author: null,
    genre: null,
    publicationDate: null,
  });
  const [addBookData, setAddBookData] = useState({
    bookName: null,
    image: null,
    author: null,
    genre: null,
    publicationDate: null,
  });
  const [addFlag, setAddFlag] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [removeBook, setRemoveBook] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    flag: false,
    message: null,
  });

  const booksData = useSelector((state) => state.books.bookList);
  const updatedBook = useSelector((state) => state.books.updatedBook);
  const deleteBookStatus = useSelector((state) => state.books.deleteBookStatus);
  const addBookStatus = useSelector((state) => state.books.addBokStatus);

  useEffect(() => {
    dispatch(fetchBooksList());
  }, []);

  useEffect(() => {
    if (booksData) {
      setBooksList(booksData);
      setFilteredData(booksData);
      booksData.map((item) => {
        authors.push(item?.author);
      });
      booksData.map((item) => {
        genres.push(item?.genre);
      });
    }
  }, [booksData]);

  useEffect(() => {
    if (addFlag === true) {
      const formData = new FormData();
      formData.append('bookName', addBookData.bookName);
      formData.append('author', addBookData.author);
      formData.append('genre', addBookData.genre);
      formData.append('publicationDate', addBookData.publicationDate);

      if (addBookData.image) {
        formData.append('image', addBookData.image);
      }
      dispatch(addNewBook({ formData: formData }));
    }
  }, [addFlag]);

  useEffect(() => {
    if (addBookStatus) {
      setSnackbarOpen({ flag: true, message: 'Book Added Successfully' });
      setAddFlag(false);
      setAddModal(false);
      dispatch(fetchBooksList());
    }
  }, [addBookStatus]);

  useEffect(() => {
    setUpdatedData({
      id: updateModal?.book?._id,
      bookName: updateModal?.book?.bookName,
      image: updateModal?.book?.image,
      author: updateModal?.book?.author,
      genre: updateModal?.book?.genre,
      publicationDate: updateModal?.book?.publicationDate,
    });
  }, [updateModal]);

  useEffect(() => {
    if (updatedBook) {
      setSnackbarOpen({ flag: true, message: 'Book Updated Successfully' });
      setUpdateModal({ flag: false });
      dispatch(fetchBooksList());
    }
  }, [updatedBook]);

  useEffect(() => {
    if (removeBook === true) {
      dispatch(deleteBook(updateModal?.book?._id));
    }
  }, [removeBook]);

  useEffect(() => {
    if (deleteBookStatus) {
      setSnackbarOpen({ flag: true, message: 'Book Deleted Successfully' });
      setRemoveBook(false);
      dispatch(fetchBooksList());
    }
  }, [deleteBookStatus]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleBookDataChange = () => {
    const formData = new FormData();
    formData.append('bookName', updatedData.bookName);
    formData.append('author', updatedData.author);
    formData.append('genre', updatedData.genre);
    formData.append('publicationDate', updatedData.publicationDate);

    if (updatedData.image) {
      formData.append('image', updatedData.image);
    }
    dispatch(updateBook({ formData: formData, id: updatedData?.id }));
  };

  return (
    <>
      <div className='allBooksMain'>
        <div className='filterSection'>
          <TextField id='standard-basic' label='Search' variant='standard' />
          <TextField
            className='filters'
            id='standard-select-currency'
            select
            label='Author'
            onChange={(event) => {
              if (event?.target?.value === 'All') {
                setFilteredData(booksList);
              } else {
                setFilteredData(
                  booksList?.filter(
                    (item) => item?.author === event?.target?.value
                  )
                );
              }
            }}
            variant='standard'
          >
            <MenuItem value='All'>All</MenuItem>
            {authors.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            className='filters'
            id='standard-select-currency'
            select
            label='Genre'
            onChange={(event) => {
              if (event?.target?.value === 'All') {
                setFilteredData(booksList);
              } else {
                setFilteredData(
                  booksList?.filter(
                    (item) => item?.genre === event?.target?.value
                  )
                );
              }
            }}
            variant='standard'
          >
            <MenuItem value='All'>All</MenuItem>
            {genres.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <div className='addNewBook'>
            <Button
              size='small'
              className='addButton'
              onClick={() => setAddModal(true)}
            >
              Add
            </Button>
          </div>
        </div>
        <Cards
          booksList={filteredData}
          setUpdateModal={setUpdateModal}
          setRemoveBook={setRemoveBook}
        />
      </div>
      <Modal
        open={updateModal?.flag}
        onClose={() => setUpdateModal({ flag: false })}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='updateModal'
      >
        <Box className='updateBox'>
          <span className='bookTitle'> {updateModal?.book?.bookName}</span>
          <Grid container spacing={1} className='updateGrid'>
            <Grid size={{ md: 4.5 }}>
              <img
                src={`http://localhost:3080${updateModal?.book?.image}`}
                className='modalImage'
              />
            </Grid>
            <Grid size={{ md: 6.5 }}>
              <Grid container spacing={1}>
                <Grid size={{ md: 4 }}>Author :</Grid>
                <Grid size={{ md: 8 }}>
                  <TextField
                    defaultValue={updateModal?.book?.author}
                    size='small'
                    name='author'
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ md: 4 }}> Genre:</Grid>
                <Grid size={{ md: 8 }}>
                  <TextField
                    defaultValue={updateModal?.book?.genre}
                    size='small'
                    name='genre'
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ md: 4 }}> Published Date:</Grid>

                <Grid size={{ md: 8 }}>
                  <TextField
                    defaultValue={updateModal?.book?.publicationDate}
                    size='small'
                    name='publicationDate'
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <Button
                    component='label'
                    role={undefined}
                    variant='contained'
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      accept='image/*'
                      type='file'
                      onChange={handleImageChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className='actionButtons'>
            <Button
              onClick={() => setUpdateModal({ flag: false })}
              className='buttons'
            >
              Cancel
            </Button>
            <Button onClick={() => handleBookDataChange()} className='buttons'>
              Update
            </Button>
          </div>
        </Box>
      </Modal>
      <AddNewModal
        addModal={addModal}
        setAddModal={setAddModal}
        setAddBookData={setAddBookData}
        setAddFlag={setAddFlag}
      />
      <Snackbar
        open={snackbarOpen?.flag}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbarOpen?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AllBooks;
