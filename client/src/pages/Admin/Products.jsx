import { Link } from "react-router";

const Products = () => {
  // dummy data (replace with API later)
  const products = [
    { id: 1, name: "Laptop", price: 1200, stock: 10 },
    { id: 2, name: "Phone", price: 800, stock: 0 },
  ];

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
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
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
                    to={`/admin/products/edit/${p.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600">Delete</button>
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
