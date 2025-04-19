import ShoppingItem from './ShoppingItem';

const ShoppingList = ({ items, deleteItem, editItem, toggleItem }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
      {items.map((item, index) => (
        <ShoppingItem
          key={index}
          name={item.name}
          quantity={item.quantity}
          bought={item.bought}
          onClick={() => toggleItem(index)}
          onDelete={() => deleteItem(index)}
          onEdit={(newName) => editItem(index, newName)}
        />
      ))}
    </ul>
  );
};

export default ShoppingList;
