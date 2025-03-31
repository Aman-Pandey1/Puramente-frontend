import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Filter } from "lucide-react";
import axios from "axios";
import BaseURL from "../../baseurl";
import { useCart } from "../newcomponent/cartcontext";

AOS.init();

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/products`);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "category") return a.category.localeCompare(b.category);
    if (sortOption === "latest")
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  return (
    <div
      data-aos="fade-down"
      data-aos-duration="600"
      className="py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-white via-cyan-50 to-cyan-100 min-h-screen"
    >
      <div className="w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-cyan-600 tracking-tight">
          New Collection
        </h1>
        <p className="text-lg font-medium text-cyan-800 mt-2 italic max-w-2xl mx-auto">
          “Exquisite craftsmanship meets timeless elegance – shop our stunning
          jewelry collection today!”
        </p>
      </div>

      <div className="flex justify-between items-center p-4 bg-white shadow-lg rounded-xl mb-10 max-w-5xl mx-auto">
        <div className="flex items-center space-x-4">
          <Filter className="w-6 h-6 text-cyan-600" />
          <span className="text-cyan-700 font-semibold">Filter Products</span>
        </div>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-cyan-50 text-cyan-800 border border-cyan-300 px-4 py-2 rounded-lg shadow-md hover:bg-cyan-100 focus:ring-2 focus:ring-cyan-500 transition-all duration-300 font-medium"
        >
          <option value="latest">Sort by Latest</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {loading && (
        <p className="text-center text-cyan-700 font-semibold">
          Loading products...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {sortedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            data-aos="zoom-in"
            data-aos-duration="500"
          >
            <div className="relative w-full h-36">
              <Link to={`/singleproduct/${product._id}`}>
                <img
                  src={product.image ? product.image : product.imageurl}
                  alt={product.name}
                  className="w-44 h-full  rounded-lg transform hover:scale-105 transition-all duration-500"
                />
              </Link>
              <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
                New
              </span>
            </div>

            <div className="mt-6 text-center">
              <Link to={`/singleproduct/${product._id}`}>
                <h3 className="text-xl font-bold text-cyan-800 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-cyan-600 mt-1">{product.category}</p>
                <p className="text-xs text-cyan-500 mt-2 font-medium">
                  Design Code: {product.code}{" "}
                  <span className="font-semibold"></span>
                </p>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                Add To List
              </button>
            </div>

            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-100 rounded-full -mr-12 -mt-12 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
