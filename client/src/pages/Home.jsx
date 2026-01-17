import { useState } from "react";
import { Link } from "react-router";
import { categories, images, products, Newsimages } from "../utils";


function Home() {
  // Curosal Function start
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  // Marquee text
  const text = `
  Welcome to ShopX! Enjoy 50% off on all electronics this weekend. 
  Free shipping on orders over $50. Discover our new summer collection today. 
  Limited time offer on smartwatches and headphones. Don’t miss out on our exclusive deals for loyal customers. 
  Sign up now and get an extra 10% off your first purchase. Explore trending fashion, gadgets, and home essentials. 
  Quality products, fast delivery, secure payment. Join thousands of happy customers shopping with ShopX every day. 
  Your satisfaction is our top priority. Shop now and save big!
  `; // 100+ words example;

  //   Products Function
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i - rating < 1) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <>
      {/* Curosel */}
      <section className="mt-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Slides */}
          <div className="relative overflow-hidden rounded-lg">
            {images.map((img, index) => (
              <div
                key={index}
                className={`transition-transform duration-300 ease-in-out ${
                  index === current
                    ? "translate-x-0"
                    : "translate-x-full absolute inset-0"
                }`}
              >
                {index === current && (
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? "bg-blue-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="mt-10">
        <div className="overflow-hidden whitespace-nowrap bg-gray-100 py-3">
          <div className="animate-marquee inline-block">
            <span className="text-gray-800 font-medium">{text}</span>
          </div>
        </div>
      </section>

      {/* Feature And Categery */}
      <section>
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link
                  to={category.link}
                  key={category.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold text-lg">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* Products card */}

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    {product.badge}
                  </div>
                )}

                {/* Product Image */}
                <Link to={'product/:1'}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-48 object-cover transition-transform duration-300 hover:scale-105 ${
                    product.stock === "Out of Stock" ? "opacity-50" : ""
                  }`}
                />
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 text-sm ml-2">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-blue-600 font-bold">
                    {product.price}
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      product.stock === "In Stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </p>

                  <button
                    disabled={product.stock === "Out of Stock"}
                    className={`mt-4 w-full py-2 rounded-md font-medium transition ${
                      product.stock === "Out of Stock"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Newsletter
              </h2>
              <p className="text-blue-100 mb-6">
                Subscribe to receive exclusive offers, latest product updates,
                special discounts, and shopping tips directly in your inbox. Be
                the first to know about new arrivals and limited-time deals.
              </p>

              {/* Form */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Right Images */}
            <div className="grid grid-cols-3 gap-3">
              {Newsimages.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={img}
                    alt="Newsletter visual"
                    className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
