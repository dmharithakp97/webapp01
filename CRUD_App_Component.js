     import React, { useEffect, useState } from 'react';
     import axios from 'axios';

     function App() {
       const [items, setItems] = useState([]);
       const [newItem, setNewItem] = useState({ name: '', description: '' });

       useEffect(() => {
         axios.get('http://localhost:5000/items').then((res) => {
           setItems(res.data);
         });
       }, []);

       const createItem = () => {
         axios.post('http://localhost:5000/items', newItem).then((res) => {
           setItems([...items, res.data]);
           setNewItem({ name: '', description: '' });
         });
       };

       const updateItem = (id, updatedItem) => {
         axios.put(`http://localhost:5000/items/${id}`, updatedItem).then((res) => {
           setItems(items.map((item) => (item._id === id ? res.data : item)));
         });
       };

       const deleteItem = (id) => {
         axios.delete(`http://localhost:5000/items/${id}`).then(() => {
           setItems(items.filter((item) => item._id !== id));
         });
       };

       return (
         <div>
           <h1>CRUD App</h1>
           <input
             type="text"
             placeholder="Name"
             value={newItem.name}
             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
           />
           <input
             type="text"
             placeholder="Description"
             value={newItem.description}
             onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
           />
           <button onClick={createItem}>Create Item</button>
           <ul>
             {items.map((item) => (
               <li key={item._id}>
                 <input
                   type="text"
                   value={item.name}
                   onChange={(e) => updateItem(item._id, { ...item, name: e.target.value })}
                 />
                 <input
                   type="text"
                   value={item.description}
                   onChange={(e) => updateItem(item._id, { ...item, description: e.target.value })}
                 />
                 <button onClick={() => deleteItem(item._id)}>Delete</button>
               </li>
             ))}
           </ul>
         </div>
       );
     }

     export default App;