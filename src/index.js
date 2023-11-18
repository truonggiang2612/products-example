const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const { log } = require('console');
const express = require('express');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db/index');

// Connect to DB
db.connect();


// Cấu hình static file
app.use(express.static(path.join(__dirname, 'public')));


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


// OVERRIDE METHOD POST = PUT,...
app.use(methodOverride('_method'));


// Sử dụng middleware Morgan để ghi log các yêu cầu HTTP đến máy chủ
// app.use(morgan('combined'));


// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
