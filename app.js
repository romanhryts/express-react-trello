require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const DB_LINK = process.env.DB_LINK;

const app = express();

const listsRouter = require('./src/routers/lists');
const cardRouter = require('./src/routers/card');

mongoose.set('strictQuery', false);
mongoose.connect(
    DB_LINK,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => app.listen(PORT, () => console.log(`Server has started on port ${PORT}...`))
);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: [ 'http://localhost:3000' ] }));

app.use('/lists', listsRouter);
app.use('/card', cardRouter);