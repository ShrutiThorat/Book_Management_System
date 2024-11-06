import './AddBookModal.scss';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const AddNewModal = (props) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setAddBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    props.setAddBookData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  return (
    <Modal
      open={props?.addModal}
      //   onClose={props?.addModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='updateModal'
    >
      <Box className='updateBox'>
        <span className='bookTitle'> Add New Book</span>
        <Grid container spacing={1} className='updateGrid'>
          <Grid size={{ md: 4 }}> Book Name :</Grid>
          <Grid size={{ md: 8 }}>
            <TextField
              size='small'
              name='bookName'
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ md: 4 }}> Author :</Grid>
          <Grid size={{ md: 8 }}>
            <TextField
              size='small'
              name='author'
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ md: 4 }}> Genre:</Grid>
          <Grid size={{ md: 8 }}>
            <TextField
              size='small'
              name='genre'
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ md: 4 }}> Published Date:</Grid>
          <Grid size={{ md: 8 }}>
            <TextField
              size='small'
              name='publicationDate'
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
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
        <div className='actionButtons'>
          <Button
            className='addButton'
            onClick={() => {
              props.setAddModal(false);
              props.setAddFlag(false);
            }}
          >
            Cancel
          </Button>
          <Button className='addButton' onClick={() => props.setAddFlag(true)}>
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default AddNewModal;
