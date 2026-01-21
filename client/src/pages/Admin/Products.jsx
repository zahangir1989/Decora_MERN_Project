import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Products = () => {
  // dummy data (replace with API later)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
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

  const deletedProduct = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/products/deleted/${id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success("🎉 Product Deleted successful!");
        // ✅ REMOVE PRODUCT FROM UI
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id),
        );
      }
      console.log(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Products</h1>
        <Link
          to="/admin/products/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3 text-center">${p.price}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out"}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${p._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletedProduct(p._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
