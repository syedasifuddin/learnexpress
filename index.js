const express = require('express');
const birds = require('./birds')

const app = express();

app.use('/birds', birds)

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.get('/', (req, res) => {
    res.sendStatus(200);
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

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})