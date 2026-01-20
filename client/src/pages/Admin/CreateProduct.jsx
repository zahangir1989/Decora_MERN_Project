import { useNavigate } from "react-router";

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call later
    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Name" />
        <input className="w-full border p-2 rounded" placeholder="Price" />
        <input className="w-full border p-2 rounded" placeholder="Stock" />
        <input className="w-full border p-2 rounded" placeholder="Image URL" />

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
