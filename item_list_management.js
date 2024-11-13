     let items = [];
     
     function createItem() {
       const name = document.getElementById('name').value;
       const description = document.getElementById('description').value;
       
       if (name && description) {
         const newItem = { id: Date.now(), name, description };
         items.push(newItem);
         renderItems();
         
         document.getElementById('name').value = '';
         document.getElementById('description').value = '';
       }
     }
     
     function renderItems() {
       const itemList = document.getElementById('item-list');
       itemList.innerHTML = '';
       
       items.forEach(item => {
         const li = document.createElement('li');
         li.className = 'mb-2';
         
         const nameInput = document.createElement('input');
         nameInput.type = 'text';
         nameInput.value = item.name;
         nameInput.className = 'mr-2 p-1 border border-gray-300 rounded';
         nameInput.onchange = (e) => updateItem(item.id, e.target.value, item.description);
         
         const descriptionInput = document.createElement('input');
         descriptionInput.type = 'text';
         descriptionInput.value = item.description;
         descriptionInput.className = 'mr-2 p-1 border border-gray-300 rounded';
         descriptionInput.onchange = (e) => updateItem(item.id, item.name, e.target.value);
         
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Delete';
         deleteButton.className = 'p-1 bg-red-500 text-white rounded';
         deleteButton.onclick = () => deleteItem(item.id);
         
         li.appendChild(nameInput);
         li.appendChild(descriptionInput);
         li.appendChild(deleteButton);
         itemList.appendChild(li);
       });
     }
     
     function updateItem(id, name, description) {
       items = items.map(item => {
         if (item.id === id) {
           return { ...item, name, description };
         }
         return item;
       });
       renderItems();
     }
     
     function deleteItem(id) {
       items = items.filter(item => item.id !== id);
       renderItems();
     }