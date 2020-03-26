// Modules
// -- Init dotenv
require('dotenv').config();
const express = require('express');
const path = require('path');

// "App" Web Server Init
const app = express();

// Init Static Files
app.use('/assets', express.static(path.join(__dirname , 'public')));

// Init Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// PORT Init
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('test', {users: ['alaa', 'zayed', 'nader']});
});

app.listen(PORT, () => {
    console.log(`Server Run On PORT ${PORT}`);
});

// localhost:3000
// 127.0.0.1:3000