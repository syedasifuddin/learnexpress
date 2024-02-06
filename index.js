const express = require('express');
const birds = require('./birds')

const app = express();

app.use('/birds', birds)

app.get('/user/:id', (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route')
    // otherwise pass the control to the next middleware function in this stack
    else next()
}, (req, res, next) => {
    // send a regular response
    res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
    res.send('special')
})

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.get('/', (req, res) => {
    throw new Error("Hello");
})

app.get('/example/a', (req, res) => {
    res.send('Hello from A!')
})

app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
}, (req, res) => {
    res.send('Hello from B!')
})

const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

const cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', cb0, cb1, cb2)


app.get('/users/:userId-:bookId', (req, res) => {
    res.send(req.params)
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.all('/secret', (req, res, next) => {
    res.send("Hello From Secret")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})