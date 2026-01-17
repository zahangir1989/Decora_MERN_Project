import React, { useState } from "react";
const product = {
  id: 1,
  name: "Wireless Noise Cancelling Headphones",
  price: 149.99,
  rating: 4.6,
  stock: "In Stock",
  images: [
    "https://images.pexels.com/photos/3394669/pexels-photo-3394669.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  description:
    "Experience premium sound quality with active noise cancellation. Designed for comfort, long battery life, and immersive audio performance for everyday use.",
  features: [
    "Active Noise Cancellation",
    "40-hour Battery Life",
    "Bluetooth 5.3",
    "Fast Charging Support",
    "Premium Build Quality",
  ],
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={
          i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }
      >
        ★
      </span>
    );
  }
  return stars;
};
function ProductDetails() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow"
            />
            <div className="flex gap-3 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    mainImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mt-2">
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-600">{product.rating} / 5</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-blue-600 mt-4">
              ${product.price}
            </p>

            {/* Stock */}
            <p
              className={`mt-2 font-medium ${
                product.stock === "In Stock" ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock}
            </p>

            {/* Quantity */}
            <div className="flex items-center mt-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border rounded-l hover:bg-gray-200"
              >
                −
              </button>
              <span className="px-6 py-2 border-t border-b">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border rounded-r hover:bg-gray-200"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button className="border border-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                Wishlist
              </button>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">
                Product Description
              </h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
