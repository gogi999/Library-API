const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://gogi9:" + 
    process.env.MONGO_ATLAS_PW + 
    "@webdevsimplified-wmcm0.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!')    
);

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}...`));
