import axios from "axios";
import { createContext, useState } from "react";
export let cartContext = createContext(0);
export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const [cartId, setCartId] = useState(0);

  let token = localStorage.getItem("userToken");
  async function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(async (res) => {
        await getCartProducts();
        return true;
      })
      .catch((error) => {
        console.error(
          "Add to cart error:",
          error.response?.data || error.message
        );
        return false;
      });
  }
  async function getCartProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setCartId(res.data.cartId);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
      })
      .catch((error) => {
        return false;
      });
  }
  async function updateCartQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: { token },
        }
      )
      .then((res) => {
        setCartId(res.data.cartId);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
        return true;
      })
      .catch((error) => {
        console.error("Add to cart error:", error);
        return false;
      });
  }
  async function deleteItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token },
      })
      .then((res) => {
        setCartId(res.data.cartId);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductsCart(res.data.data.products);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
  async function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCartProducts,
        updateCartQuantity,
        deleteItem,
        clearCart,
        setNumOfCartItems,
        setTotalPrice,
        numOfCartItems,
        totalPrice,
        productsCart,
        setProductsCart,
        cartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
