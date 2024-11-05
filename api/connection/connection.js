const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://shrutithorat:shruti123@cluster0.fm646.mongodb.net/book_store?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then((res) => console.log('connected'));
