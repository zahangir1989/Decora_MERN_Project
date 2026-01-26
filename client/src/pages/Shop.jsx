import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router";
import { addToCartApi } from "../api/cart.api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add to cart function
  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCartApi(productId, 1);
      toast.success(res.message || "Added to cart ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Add to cart failed ❌");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/products/all",
        );

        // backend response handle
        setProducts(res.data.products || res.data);
        console.log(res.data.products);
      } catch (err) {
        console.log(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={
                  product.images?.[0] ||
                  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"
                }
                alt={product.title}
                className="h-48 w-full object-cover"
              />
            </Link>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ৳{product.price}
                </span>

                <span
                  className={`text-sm font-medium ${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product._id)}
                disabled={product.stock === 0}
                className={`w-full mt-2 py-2 rounded-lg text-white font-medium ${
                  product.stock > 0
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
