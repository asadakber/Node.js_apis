const express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());

const books = [
    { title: 'Asad', id: 1 },
    { title: 'Ahmed', id: 2 },
    { title: 'Daniyal', id: 3 },
    { title: 'Sohaib', id: 4 },
    { title: 'Anus', id: 5},
    { title: 'As', id: 6},
];

// READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!')
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));

    if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(book);
});


// CREATE Request Handlers
app.post('/api/books', (req, res) => {
    const { error } = ValidateBook(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const book = {
        id: books.length + 1,
        title: req.body.title
    };

    books.push(book);
    res.send(book);
});

//UPDATE Request Handler

app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));

    if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = ValidateBook(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    book.title = req.body.title;
    res.send(book);

});

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(book);
});

function ValidateBook(book) {
    const schema = {
        title: joi.string().min(3).required()
    };
    return joi.validate(book, schema);
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
