console.log("Application Running");

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Welcome To Todo App</h1>');
});

app.listen(3000);

// localhost:3000
// 127.0.0.1:3000