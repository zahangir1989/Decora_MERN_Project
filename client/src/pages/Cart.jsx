// import React, { useState } from "react";

// const initialCart = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 149.99,
//     quantity: 1,
//     image:
//       "https://images.pexels.com/photos/3394669/pexels-photo-3394669.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 199.99,
//     quantity: 1,
//     image:
//       "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 3,
//     name: "Camera",
//     price: 499.99,
//     quantity: 1,
//     image:
//       "https://images.pexels.com/photos/704320/pexels-photo-704320.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 4,
//     name: "Sneakers",
//     price: 79.99,
//     quantity: 1,
//     image:
//       "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 5,
//     name: "Bluetooth Speaker",
//     price: 99.99,
//     quantity: 1,
//     image:
//       "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
// ];

// const Cart = () => {
//   const [cart, setCart] = useState(initialCart);

//   const updateQty = (id, type) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity:
//                 type === "inc"
//                   ? item.quantity + 1
//                   : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
    // <section className="bg-gray-50 py-12 min-h-screen">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <h2 className="text-3xl font-bold mb-8 text-gray-900">
    //       Shopping Cart
    //     </h2>

    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //       {/* Cart Items */}
    //       <div className="lg:col-span-2 space-y-6">
    //         {cart.map((item) => (
    //           <div
    //             key={item.id}
    //             className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
    //           >
    //             <img
    //               src={item.image}
    //               alt={item.name}
    //               className="w-28 h-28 object-cover rounded-md"
    //             />

    //             <div className="flex-1 w-full">
    //               <h3 className="text-lg font-semibold text-gray-800">
    //                 {item.name}
    //               </h3>
    //               <p className="text-blue-600 font-bold">
    //                 ${item.price.toFixed(2)}
    //               </p>

    //               {/* Quantity */}
    //               <div className="flex items-center mt-3">
    //                 <button
    //                   onClick={() => updateQty(item.id, "dec")}
    //                   className="px-3 py-1 border rounded-l hover:bg-gray-200"
    //                 >
    //                   −
    //                 </button>
    //                 <span className="px-4 py-1 border-t border-b">
    //                   {item.quantity}
    //                 </span>
    //                 <button
    //                   onClick={() => updateQty(item.id, "inc")}
    //                   className="px-3 py-1 border rounded-r hover:bg-gray-200"
    //                 >
    //                   +
    //                 </button>
    //               </div>
    //             </div>

    //             <div className="flex flex-col items-end gap-2">
    //               <p className="font-semibold text-gray-800">
    //                 ${(item.price * item.quantity).toFixed(2)}
    //               </p>
    //               <button
    //                 onClick={() => removeItem(item.id)}
    //                 className="text-red-500 text-sm hover:underline"
    //               >
    //                 Remove
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Summary */}
    //       <div className="bg-white p-6 rounded-lg shadow h-fit">
    //         <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

    //         <div className="flex justify-between mb-2 text-gray-700">
    //           <span>Subtotal</span>
    //           <span>${subtotal.toFixed(2)}</span>
    //         </div>

    //         <div className="flex justify-between mb-2 text-gray-700">
    //           <span>Shipping</span>
    //           <span>Free</span>
    //         </div>

    //         <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
    //           <span>Total</span>
    //           <span>${subtotal.toFixed(2)}</span>
    //         </div>

    //         <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
    //           Proceed to Checkout
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
//   );
// };

// export default Cart;

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   clearCartApi,
//   getMyCartApi,
//   removeFromCartApi,
//   updateCartItemApi,
// } from "../api/cart.api";

// const Cart = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     try {
//       const res = await getMyCartApi();
//       setCart(res.cart);
//     } catch (err) {
//       toast.error("Failed to load cart");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleQty = async (productId, quantity) => {
//     try {
//       if (quantity < 1) return;

//       const res = await updateCartItemApi(productId, quantity);

//       // ✅ update UI instantly
//       setCart(res.cart);

//       console.log(res);

//       toast.success("Quantity updated ✅");
//     } catch (err) {
//       console.log(err);
//       toast.error("Update failed");
//     }
//   };

//   const handleRemove = async (productId) => {
//     try {
//       const res = await removeFromCartApi(productId);

//       // ✅ update UI instantly
//       setCart(res.cart);

//       toast.success("Removed ✅");
//     } catch (err) {
//       console.log(err);
//       toast.error("Remove failed");
//     }
//   };

//   const handleClear = async () => {
//     try {
//       const res = await clearCartApi();
//       setCart(res.cart);
//       toast.success("Cart cleared ✅");
//     } catch (err) {
//       console.log(err);
//       toast.error("Clear failed");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading cart...</p>;

//   if (!cart || cart.items.length === 0)
//     return <p className="text-center mt-10">Cart is empty 🛒</p>;

//   return (
//      <section className="bg-gray-50 py-12 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>

//           <button
//             onClick={clearCart}
//             className="self-start sm:self-auto text-sm font-semibold text-red-600 hover:underline"
//           >
//             Clear Cart
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             {cart.items.map((item) => {
//               const productId = item.product?._id || item.product;
//               const image =
//                 item.image ||
//                 "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg";

//               return (
//                 <div
//                   key={productId}
//                   className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
//                 >
//                   <img
//                     src={image}
//                     alt={item.title}
//                     className="w-28 h-28 object-cover rounded-md"
//                   />

//                   <div className="flex-1 w-full">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {item.title}
//                     </h3>

//                     <p className="text-blue-600 font-bold">
//                       ৳{Number(item.price).toFixed(2)}
//                     </p>

//                     {/* Quantity */}
//                     <div className="flex items-center mt-3">
//                       <button
//                         onClick={() =>
//                           updateQty(productId, "dec", item.quantity)
//                         }
//                         disabled={item.quantity <= 1}
//                         className="px-3 py-1 border rounded-l hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         −
//                       </button>

//                       <span className="px-4 py-1 border-t border-b font-semibold">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() =>
//                           updateQty(productId, "inc", item.quantity)
//                         }
//                         className="px-3 py-1 border rounded-r hover:bg-gray-200"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end gap-2">
//                     <p className="font-semibold text-gray-800">
//                       ৳{(item.price * item.quantity).toFixed(2)}
//                     </p>

//                     <button
//                       onClick={() => removeItem(productId)}
//                       className="text-red-500 text-sm hover:underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Summary */}
//           <div className="bg-white p-6 rounded-lg shadow h-fit">
//             <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Subtotal</span>
//               <span>৳{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Shipping</span>
//               <span className="text-green-600 font-semibold">Free</span>
//             </div>

//             <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
//               <span>Total</span>
//               <span>৳{subtotal.toFixed(2)}</span>
//             </div>

//             <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
//               Proceed to Checkout
//             </button>

//             <p className="text-xs text-gray-500 mt-3 text-center">
//               Secure checkout • Fast delivery
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  clearCartApi,
  getMyCartApi,
  removeFromCartApi,
  updateCartItemApi,
} from "../api/cart.api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await getMyCartApi();
      setCart(res.cart);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ subtotal calculate
  const subtotal = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // ✅ update quantity
  const updateQty = async (productId, type, currentQty) => {
    try {
      let newQty = type === "inc" ? currentQty + 1 : currentQty - 1;
      if (newQty < 1) return;

      const res = await updateCartItemApi(productId, newQty);
      setCart(res.cart);
      toast.success("Quantity updated ✅");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  // ✅ remove item
  const removeItem = async (productId) => {
    try {
      const res = await removeFromCartApi(productId);
      setCart(res.cart);
      toast.success("Removed ✅");
    } catch (err) {
      console.log(err);
      toast.error("Remove failed");
    }
  };

  // ✅ clear cart
  const clearCart = async () => {
    try {
      const res = await clearCartApi();
      setCart(res.cart);
      toast.success("Cart cleared ✅");
    } catch (err) {
      console.log(err);
      toast.error("Clear failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
        <p className="text-gray-500">Add some products to continue shopping.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>

          <button
            onClick={clearCart}
            className="self-start sm:self-auto text-sm font-semibold text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => {
              const productId = item.product?._id || item.product;
              const image =
                item.image ||
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg";

              return (
                <div
                  key={productId}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={image}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-md"
                  />

                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-blue-600 font-bold">
                      ৳{Number(item.price).toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          updateQty(productId, "dec", item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 border rounded-l hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        −
                      </button>

                      <span className="px-4 py-1 border-t border-b font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(productId, "inc", item.quantity)
                        }
                        className="px-3 py-1 border rounded-r hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-gray-800">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(productId)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
              <span>Total</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Secure checkout • Fast delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

