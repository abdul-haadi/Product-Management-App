import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [productname, setProductName] = useState("");
  const [specs, setSpecs] = useState("");
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  function handleProductName(event) {
    setProductName(event.target.value);
  }

  function handleSpecs(event) {
    setSpecs(event.target.value);
  }

  function handlePrice(event) {
    setPrice(event.target.value);
  }

  function handleAddProduct() {
    setProducts((val) => {
      return [
        ...val,
        {
          id: val.length + 1,
          productname: productname,
          specs: specs,
          price: price,
        },
      ];
    });
    setProductName("");
    setPrice(0);
    setSpecs("");
  }

  function handleDelete(index) {
    let reducedList = [...products];
    reducedList.splice(index, 1);
    setProducts(reducedList);
  }

  function handleEdit(id) {
    let product = products.find((product) => {
      return product.id === id;
    });
    setProductName(product.productname);
    setSpecs(product.specs);
    setPrice(product.price);
    setSelectedId(id);
  }

  function onEditProduct(id) {
    setProducts((val) => {
      return val.map((product) => {
        if (product.id === id) {
          return {
            id: id,
            productname: productname,
            price: price,
            specs: specs,
          };
        } else {
          return product;
        }
      });
    });
    setSelectedId(0);
    setProductName("");
    setPrice(0);
    setSpecs("");
  }

  return (
    <div className="product-management-application">
      <div className="product-grid">
        {products.map((product, index) => {
          return (
            <div className="product-card">
              <span>Product Name: {product.productname}</span>
              <span>Specification: {product.specs}</span>
              <span>Price: {product.price}</span>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="product-add-container">
        <input
          type="text"
          placeholder="Product Name"
          value={productname}
          onChange={handleProductName}
        ></input>
        <input
          type="text"
          placeholder="Specification"
          value={specs}
          onChange={handleSpecs}
        ></input>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={handlePrice}
        ></input>
        {selectedId === 0 ? (
          <button className="button add" onClick={handleAddProduct}>
            Add
          </button>
        ) : (
          <button
            className="button edit"
            onClick={() => onEditProduct(selectedId)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
