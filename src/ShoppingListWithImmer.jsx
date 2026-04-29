import { useState } from "react";
import { useImmer } from "use-immer";
import "./ShoppingListWithImmer.css";

export default function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer([
    {
      id: 1,
      name: "Apples",
      quantity: 3,
      details: {
        category: "Fruit",
        notes: "Buy fresh red apples",
      },
    },
    {
      id: 2,
      name: "Milk",
      quantity: 1,
      details: {
        category: "Dairy",
        notes: "Low-fat milk",
      },
    },
  ]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  function addItem() {
    if (!name.trim() || quantity < 1) return;

    updateShoppingList((draft) => {
      draft.push({
        id: Date.now(),
        name,
        quantity: Number(quantity),
        details: {
          category,
          notes,
        },
      });
    });

    setName("");
    setQuantity(1);
    setCategory("");
    setNotes("");
  }

  function updateItem(id) {
    updateShoppingList((draft) => {
      const item = draft.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
        item.details.notes = "Updated with Immer";
      }
    });
  }

  function removeItem(id) {
    updateShoppingList((draft) => {
      const index = draft.findIndex((item) => item.id === id);

      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }

  return (
    <div className="container">
      <h1>Shopping List with Immer</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="list">
        {shoppingList.length === 0 ? (
          <p>No items in the shopping list.</p>
        ) : (
          shoppingList.map((item) => (
            <div className="card" key={item.id}>
              <h2>{item.name}</h2>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Category:</strong> {item.details.category}
              </p>
              <p>
                <strong>Notes:</strong> {item.details.notes}
              </p>

              <button onClick={() => updateItem(item.id)}>Update Item</button>
              <button className="delete" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}