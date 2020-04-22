// Modules
// -- Init dotenv
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Init DB
const db = require('./db/db');

// Models
const Todo = require('./models/Todo');

// "App" Web Server Init
const app = express();

// Init Static Files
app.use('/assets', express.static(path.join(__dirname , 'public')));

// Init Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Init Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// PORT Init
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    
    // Get Todos Data
    let todos = await Todo.find();

    // Send Todos Data To Index View
    res.render('index', {
        pageTitle: 'Todos',
        todos,
    });
});

app.get('/create', (req, res) => {
    res.render('create', {
        pageTitle: 'Create Todo'
    });
});

app.get('/show/:id', async (req, res) => {
    
    const todo = await Todo.findById(req.params.id);

    res.render('show', {
        pageTitle: 'Show Todo',
        todo,
    });
});

app.get('/edit', (req, res) => {
    res.render('edit', {
        pageTitle: 'Edit Todo'
    });
});

app.post('/save', (req, res) => {
    // Get Title and Body
    const { title, body } = req.body;
    
    // Save Todo In DB
    Todo.create({title, description: body}, (err, todo) => {
        
        if (err) {
            // Return to create Page
            return res.redirect('/create');
        }
       
        // Redirect Todos Index
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server Run On PORT ${PORT}`);
});
