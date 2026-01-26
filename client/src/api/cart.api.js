import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const addToCartApi = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data;
};

export const getMyCartApi = async () => {
  const res = await api.get("/cart/my-cart");
  return res.data;
};

export const updateCartItemApi = async (productId, quantity) => {
  const res = await api.put("/cart/update", { productId, quantity });
  return res.data;
};

export const removeFromCartApi = async (productId) => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};
