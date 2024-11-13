     const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');

     const app = express();
     app.use(cors());
     app.use(express.json());

     mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

     const itemSchema = new mongoose.Schema({
       name: String,
       description: String
     });

     const Item = mongoose.model('Item', itemSchema);

     // Create
     app.post('/items', async (req, res) => {
       const newItem = new Item(req.body);
       await newItem.save();
       res.status(201).send(newItem);
     });

     // Read
     app.get('/items', async (req, res) => {
       const items = await Item.find();
       res.send(items);
     });

     // Update
     app.put('/items/:id', async (req, res) => {
       const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
       res.send(updatedItem);
     });

     // Delete
     app.delete('/items/:id', async (req, res) => {
       await Item.findByIdAndDelete(req.params.id);
       res.status(204).send();
     });

     app.listen(5000, () => {
       console.log('Server is running on port 5000');
     });