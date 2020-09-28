const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//LOCAL REQUIRE
const home_Route = require('./routes/home.route');
const file_Route = require('./routes/File.route.');
const search_Route = require('./routes/api/Search.route');
//const Handlebars_Route = require('./routes/Handlebar.route');

dotenv.config();
const app = express();

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db!')
);
//BODY PARSER
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

//STATIC MIDDLEWARE
app.use(express.static('public'));

//VIEW ENGINE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));  
app.set('view engine', 'handlebars');

//ROUTES
app.use('/', home_Route);
app.use('/File', file_Route);
app.use('/api/search', search_Route);
//app.use('/HandleBars', Handlebars_Route);

app.listen(5000, () => console.log('Listening on port 5000'));

/* STATUS: COMPLETE
    Working on cleaning up code.
    Working on deploy latest version.
*/

// ****** LEFT ON FILE_view.handlebars  ***********