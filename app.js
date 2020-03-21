// Modules
// -- Init dotenv
require('dotenv').config();
const express = require('express');

// "App" Web Server Init
const app = express();

// PORT Init
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome To Todo App</h1>');
});

app.listen(PORT, () => {
    console.log(`Server Run On PORT ${PORT}`);
});

// localhost:3000
// 127.0.0.1:3000