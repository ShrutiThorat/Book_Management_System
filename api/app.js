const express = require('express');
const app = express();
require('./connection/connection');
const bookRoute = require('./routes/booksRoute');

app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api/books', bookRoute);

app.listen(3080, () => {
  console.log('server started');
});
