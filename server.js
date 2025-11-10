const express = require('express');

const app = express();
app.use(express.json());
const port = 7000;

let todos = [];

app.post('/todos', (req, res) => { 
    const  {title,description} = req.body;
    const newTodo ={
        id: todos.length + 1,
        title,
        description
    };
todos.push(newTodo);
console.log(todos);
res.status(201).json(newTodo);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});



app .listen(port, () => {
  console.log("Server is running on "+ port);
});

