import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/products/single/${id}`,
        );

        // backend response handle
        // setProduct(res.data.product || res.data);
        if (res.data.success) {
          setForm({
            title: res.data.product.title || "",
            description: res.data.product.description || "",
            price: res.data.product.price || "",
            stock: res.data.product.stock || "",
            category: res.data.product.category || "",
            images: res.data.product.images?.join(", ") || "",
            isFeatured: res.data.product.isFeatured || false,
          });
        }

        console.log(res.data.product);
      } catch (err) {
        console.log(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/products/edit/${id}`,
        {
          title: form.title,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
          images: form.images,
          isFeatured: form.isFeatured,
        },
        { withCredentials: true },
      );
      if (data.success) {
        toast.success("Product edit successfully 🎉");
        navigate("/admin/products");
      }
      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: "",
        isFeatured: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Product Title"
          className="input"
          onChange={handleChange}
          value={form.title}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input h-28"
          onChange={handleChange}
          value={form.description}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input"
          onChange={handleChange}
          value={form.price}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="input"
          onChange={handleChange}
          value={form.stock}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="input"
          onChange={handleChange}
          value={form.category}
          required
        />

        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          className="input"
          onChange={handleChange}
          value={form.images}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
