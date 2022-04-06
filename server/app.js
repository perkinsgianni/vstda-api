const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

let initialData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];
// console.log(initialData)

// JSON-parsing middleware
app.use(bodyParser.json());

// morgan 'dev' middleware
app.use(morgan('dev'));

// response of GET req to / route
app.get('/', (req, res) => {
    res.send({
        status: 'ok'
    })
})

app.route('/api/TodoItems')
    // response of GET req to /api/TodoItems route
    .get((req, res) => {
        res.send(initialData)
    })
    // create single to-do item
    .post((req, res) => {
        let newItem = {
            todoItemId: 3,
            name: 'another done item',
            priority: 0,
            completed: true
        };

        // iterate through initialData arr, invoking each item
        initialData.map((item) => {
            // if todoItemId value matches value in data of req body
            if ( item.todoItemId == req.body.todoItemId ) {
                // assign req body data to item
                item.todoItemId = req.body.todoItemId;
                // send data
                res.status(201).send(req.body)
            } else {
                // if value doesn't match, add newItem
                initialData.push(newItem);
            }
        })
    })

// parameters capture values specified at their position in the URL
app.route('/api/TodoItems/:number')
    // response of GET req to /api/TodoItems/:number route
    .get((req, res) => {
        res.send(initialData[req.params.number]) 
    })
    // delete single to-do item
    .delete((req, res) => {
        res.send(initialData[req.params.number]) 
    })
    // update to-do item
    .put((req, res) => {
        res.send(initialData[req.params.number])
    })

module.exports = app;