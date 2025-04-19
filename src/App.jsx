import { useState } from 'react';
import ShoppingInput from './components/ShoppingInput';
import ShoppingList from './components/ShoppingList';

function App() {
  const [lists, setLists] = useState([
    { name: 'Lista Principal', color: '#ffb703', items: [] }
  ]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [newListName, setNewListName] = useState('');
  const [newListColor, setNewListColor] = useState('#a2d2ff');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedColor, setEditedColor] = useState('');

  const currentList = lists[selectedListIndex];

  const addItem = (item) => {
    if (!item.name || item.quantity <= 0) return;
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items.push({ ...item, bought: false });
    setLists(updatedLists);
  };

  const deleteItem = (index) => {
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items.splice(index, 1);
    setLists(updatedLists);
  };

  const toggleItem = (index) => {
    const updatedLists = [...lists];
    const item = updatedLists[selectedListIndex].items[index];
    item.bought = !item.bought;

    const notBought = updatedLists[selectedListIndex].items.filter(i => !i.bought);
    const bought = updatedLists[selectedListIndex].items.filter(i => i.bought);
    updatedLists[selectedListIndex].items = [...notBought, ...bought];

    setLists(updatedLists);
  };

  const editItem = (index, newName) => {
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].items[index].name = newName;
    setLists(updatedLists);
  };

  const addNewList = () => {
    if (!newListName) return;
    setLists([...lists, { name: newListName, color: newListColor, items: [] }]);
    setSelectedListIndex(lists.length);
    setNewListName('');
    setNewListColor('#a2d2ff');
  };

  const deleteList = (index) => {
    if (lists.length <= 1) return alert("Debe haber al menos una lista.");
    const updated = lists.filter((_, i) => i !== index);
    setLists(updated);
    setSelectedListIndex(0);
  };

  const updateList = (index) => {
    const updated = [...lists];
    updated[index] = { ...updated[index], name: editedName, color: editedColor };
    setLists(updated);
    setEditingIndex(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📒Mis listas</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {lists.map((list, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="color"
                  value={editedColor}
                  onChange={(e) => setEditedColor(e.target.value)}
                />
                <button onClick={() => updateList(index)}>✅</button>
                <button onClick={() => setEditingIndex(null)}>❌</button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedListIndex(index)}
                  style={{
                    backgroundColor: list.color,
                    border: selectedListIndex === index ? '2px solid black' : '1px solid gray',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {list.name}
                </button>
                <button onClick={() => {
                  setEditingIndex(index);
                  setEditedName(list.name);
                  setEditedColor(list.color);
                }}>✏️</button>
                <button onClick={() => deleteList(index)}>🗑️</button>
              </>
            )}
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Nombre de nueva lista"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="color"
            value={newListColor}
            onChange={(e) => setNewListColor(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={addNewList}>➕</button>
        </div>
      </div>

      <div style={{ backgroundColor: currentList.color, padding: '1rem', borderRadius: '8px' }}>
        <h2>{currentList.name}</h2>
        <ShoppingInput addItem={addItem} />
        <ShoppingList
          items={currentList.items}
          deleteItem={deleteItem}
          toggleItem={toggleItem}
          editItem={editItem}
        />
      </div>
    </div>
  );
}

export default App;
