const express = require('express');

const app = express();

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})


app.get('/', (req, res) => {
    res.send('Hello World!')
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