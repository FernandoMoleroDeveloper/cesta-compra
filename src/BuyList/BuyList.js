import React from "react";


  const initialValue = {
    products: [
      {
        id: 0,
        title: "Platanos",
        price: 5,
      }],
    lastProductCreated: 0,
  };

  const reducer = (state, action) => {
    const newState = { ...state };

    switch (action.type) {
      case "CREATE PRODUCT":
        const newProduct = {
          id: state.lastProductCreated + 1,
          title: action.payload.title,
          price: action.payload.price,
        };
        newState.product = [...newState.products, newProduct];
        newState.lastProductCreated = newProduct.id;

        break;

      case "CHANGE PRODUCT":
        newState.products = newState.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              done: !product.done,
            };
          }
          return product;
        });
        break;

      default:
        console.error("NO EXISTE EL PRODUCTO");
    }

    return newState;
  };

const BuyList = () => {
    const [state, dispatch] = React.useReducer(reducer, initialValue);

    const inputReference = React.useRef(null);
    const inputPrice = React.useRef();

    const onSubmit = React.useCallback((event) => {
      event.preventDefault();
      const payloadToSend = {
        title: inputReference.current.value,
        price: inputPrice.current.value,
      };
      dispatch({ type: "CREATE PRODUCT", payload: payloadToSend });

      inputReference.current.value = "";
      inputPrice.current.value = "";
    }, []);

    const changeProduct = React.useCallback((productId) => {
      const payloadToSend = {
        id: productId,
      };

      dispatch({ type: "CHANGE PRODUCT", payload: payloadToSend });
    }, []);

    return (
      <div className="buy-list">
        <form onSubmit={onSubmit}>
          <input ref={inputReference} type="text" />
          <input ref={inputPrice} type="number" />
          <button type="submit">Añadir producto</button>
        </form>

        <h4>PRODUCTOS:</h4>

        <ul className="hecho">
          {state.products.map((product) => (
            <li key={product.id} onClick={() => changeProduct(product.id)}>
              {product.title} / Precio: {product.price}
            </li>
          ))}
        </ul>
      </div>
    )
  };

export default BuyList;
