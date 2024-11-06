import './Cards.scss';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid2';
import TablePagination from '@mui/material/TablePagination';

const Cards = (props) => {
  const [data, setData] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    if (props?.booksList?.length) {
      setData(props?.booksList);
    }
  }, [props?.booksList]);

  const cardGenerator = (data) => {
    return data
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      ?.map((item) => (
        <Grid size={{ md: 2 }}>
          <Card sx={{ maxWidth: 215 }} className='card'>
            <CardMedia
              className='cardMedia'
              component='img'
              height='200'
              width='150'
              image={`http://localhost:3080${item?.image}`}
              alt='green iguana'
            />
            <CardContent className='cardContent'>
              <Typography
                gutterBottom
                variant='h7'
                component='div'
                className='bookName'
              >
                {item?.bookName}
              </Typography>
              <Typography
                gutterBottom
                variant='h10'
                component='div'
                className='subTitles'
              >
                <span className='subHead'>Author: </span>
                {item?.author}
              </Typography>
              <Typography
                gutterBottom
                variant='h10'
                component='div'
                className='subTitles'
              >
                <span className='subHead'>Genre: </span> {item?.genre}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                className='actionButton'
                onClick={() =>
                  props?.setUpdateModal({ flag: true, book: item })
                }
              >
                Update
              </Button>
              <Button
                size='small'
                className='actionButton'
                onClick={() => {
                  props.setRemoveBook(true);
                  props?.setUpdateModal({ book: item });
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='cardsSection'>
      <Grid container spacing={2} className='cardContainer'>
        {cardGenerator(data)}
      </Grid>
      <TablePagination
        component='div'
        count={data?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 18, 24]}
      />
    </div>
  );
};
export default Cards;
