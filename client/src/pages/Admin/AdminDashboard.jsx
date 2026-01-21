import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user?.name} ({user?.role})
          </span>
          <img
            src={user?.avatar || "https://i.pravatar.cc/40"}
            alt="admin"
            className="w-9 h-9 rounded-full border"
          />
        </div>
      </header>

      {/* Stats */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value="312" />
        <StatCard title="Orders" value="530" />
        <StatCard title="Users" value="1,245" />
        <StatCard title="Revenue" value="$42,890" />
      </div>

      {/* Dashboard Sections */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Management */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Product Management</h2>
            <Link
              to="/admin/products"
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              to="/admin/products/create"
              className="flex-1 bg-black text-white py-3 rounded text-center"
            >
              + Add New Product
            </Link>

            <Link
              to="/admin/products"
              className="flex-1 border py-3 rounded text-center"
            >
              Manage Products
            </Link>
          </div>

          {/* Recent Products Preview */}
          <ul className="space-y-3 text-sm">
            {products.map((p) => (
              <li key={p._id} className="flex justify-between border-b pb-2">
                <span>{p.title}</span>
                <span className="text-gray-500">$ {p.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm">
            <li>📦 Product added</li>
            <li>✏️ Product updated</li>
            <li>❌ Product deleted</li>
            <li>🧾 Order completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value}</h3>
  </div>
);
