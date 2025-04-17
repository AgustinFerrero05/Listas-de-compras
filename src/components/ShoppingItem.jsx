import { useState } from 'react';

function ShoppingItem({ name, quantity, bought, onClick, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleEdit = () => {
    if (editValue.trim() !== '') {
      onEdit(editValue);
      setEditing(false);
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        textDecoration: bought ? 'line-through' : 'none',
        color: bought ? 'gray' : 'black',
        backgroundColor: '#fff',
        padding: '0.5rem',
        borderRadius: '5px',
      }}
    >
      {editing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleEdit}>💾</button>
        </>
      ) : (
        <>
          <span onClick={onClick} style={{ flex: 1, cursor: 'pointer' }}>
            {name} ({quantity})
          </span>
          <button onClick={() => setEditing(true)}>✏️</button>
          <button onClick={onDelete}>🗑️</button>
        </>
      )}
    </li>
  );
}

export default ShoppingItem;
