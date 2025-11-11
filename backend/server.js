const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const cors = require('cors'); 
app.use(cors());
//let todos = [];

mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

//creating schema 

const todoSchema = new mongoose.Schema({
  title:{
    required:true,
    type: String
    },
  description: String
});

//creation model
const todoModel = mongoose.model('Todo', todoSchema);

//create new to do item
app.post('/todos',async (req, res) => { 
    const  {title,description} = req.body;
try{
   const newTodo = new todoModel({  title,  description});
   await newTodo.save();
   res.status(201).json(newTodo);
  }
catch(error){
  console.log(error);
  res.status(500).json({message: error.message });
}
});


//get all item 
app.get('/todos', async(req, res) => {
try{
  const todos = await todoModel.find();
  res.json(todos);
}
catch(error){
  console.log(err);
  res.status(500).json({message: error.message });
}

 });
//update todo item
app.put('/todos/:id', async(req, res) => {
  
  try{
    const { title, description } = req.body;
    const  id  = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
       { title, description },
       {new: true}
      )

      if(!updatedTodo){
        return res.status(404).json({message: "Todo not found"});
      }
    res.json(updatedTodo);
  }catch(error){
    console.log(error);
    res.status(500).json({message: error.message });
  }
});

//delete todo item
app.delete('/todos/:id', async(req, res) => {
  try{
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  }catch(error){
    console.log(error);
    res.status(500).json({message: error.message });
  }
}); 



    //start the server
const port = 7000;
app .listen(port, () => {
  console.log("Server is running on "+ port);
});

