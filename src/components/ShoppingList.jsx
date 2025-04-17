const ShoppingList = ({ items, deleteItem, editItem, toggleItem }) => {
    return (
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textDecoration: item.bought ? 'line-through' : 'none',
              background: '#fff',
              borderRadius: '6px',
              padding: '0.5rem 1rem'
            }}
          >
            <div onClick={() => toggleItem(index)} style={{ cursor: 'pointer' }}>
              {item.name} ({item.quantity})
            </div>
            <div>
              <button onClick={() => editItem(index, prompt("Nuevo nombre:", item.name))}>✏️</button>
              <button onClick={() => deleteItem(index)} style={{ marginLeft: '0.5rem', color: 'red' }}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ShoppingList;
  