import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let wishListContext = createContext(0);
export default function WishListContextProvider(props) {
  const [favProducts, setFavProducts] = useState([]);

  let token = localStorage.getItem("userToken");
  async function addToWishList(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(async (res) => {
        await getFavProducts();
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

  async function getFavProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setFavProducts(res.data.data);
      })
      .catch((error) => {
        console.error("get Fav Products error:", error);
        return false;
      });
  }
  async function deleteItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token },
      })
      .then(async (res) => {
        setFavProducts(favProducts.filter((p) => p.id !== id));

        await getFavProducts();
        return true;
      })
      .catch((error) => {
        console.error("Remove from favorites error:", error);
        return false;
      });
  }
  return (
    <wishListContext.Provider
      value={{
        addToWishList,
        getFavProducts,
        deleteItem,
        favProducts,
      }}
    >
      {props.children}
    </wishListContext.Provider>
  );
}
