// Modules
// -- Init dotenv
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// Get All Todos
app.get('/', async (req, res) => {
    
    // Get Todos Data
    let todos = await Todo.find();

    // Send Todos Data To Index View
    res.render('index', {
        pageTitle: 'Todos',
        todos,
    });
});

// Create Todos Page
app.get('/create', (req, res) => {
    res.render('create', {
        pageTitle: 'Create Todo'
    });
});

// Save New Todo In DB
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

// Show Single Todo By ID
app.get('/show/:id', async (req, res) => {
    // Validate If Id Is A Valid ObjectId
    const id = req.params.id;
    isInvalidId(res, id);

    const todo = await Todo.findById(req.params.id);

    res.render('show', {
        pageTitle: 'Show Todo',
        todo,
    });
});

// Show Single Todo Edit Page By ID
app.get('/edit/:id', async (req, res) => {
    // Validate If Id Is A Valid ObjectId
    const id = req.params.id;
    isInvalidId(res, id);

    const todo = await Todo.findById(id);
    
    res.render('edit', {
        pageTitle: 'Edit Todo',
        todo,
    });
});

// Update Single Todo By ID
app.post('/update/:id', async (req, res) => {
    // Validate If Id Is A Valid ObjectId
    const id = req.params.id;
    isInvalidId(res, id);

    // Get Title And Body
    const { title, body } = req.body;

    // Update Todo By ID
    await Todo.updateOne({_id: id}, {title, description: body});
    
    // Redirect Show Route
    res.redirect(`/show/${id}`);
});

// Update Single Todo Status By ID
app.post('/update/:id/completed-status', async (req, res) => {
    // Validate If Id Is A Valid ObjectId
    const id = req.params.id;
    isInvalidId(res, id);

    // Find Todo By ID
    const todo = await Todo.findById(id);

    // Update Todo Status
    await Todo.updateOne({_id: id}, {completed: ! todo.completed}); 
    
    // Redirect Show Route
    res.redirect(`/show/${id}`);
});

// Remove Single Todo By ID
app.post('/remove/:id', async (req, res) => {
    // Validate If Id Is A Valid ObjectId
    const id = req.params.id;
    isInvalidId(res, id);

    // Delete Todo
    await Todo.deleteOne({_id: id})

    // Redirect To Index Page
    res.redirect('/');
});

const isInvalidId = (res, id) => {
    if (! mongoose.isValidObjectId(id)) {
        res.render('404', {
            pageTitle: 'Not Found',
        });
    }
};

app.listen(PORT, () => {
    console.log(`Server Run On PORT ${PORT}`);
});
