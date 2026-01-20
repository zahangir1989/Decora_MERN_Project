import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    // API update call later
    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Edit Product #{id}
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="w-full border p-2 rounded" defaultValue="Laptop" />
        <input className="w-full border p-2 rounded" defaultValue="1200" />
        <input className="w-full border p-2 rounded" defaultValue="10" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
