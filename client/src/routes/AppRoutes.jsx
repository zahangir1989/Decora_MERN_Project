import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Products from "../pages/Admin/Products";
import CreateProduct from "../pages/Admin/CreateProduct";
import EditProduct from "../pages/Admin/EditProduct";
import Shop from "../pages/Shop";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* 🚫 Login & Register blocked if logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 🔐 Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* protected End */}
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          {/* Admin Route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
