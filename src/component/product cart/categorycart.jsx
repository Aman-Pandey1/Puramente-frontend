import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseURL from "../../baseurl";
import { Link } from "react-router-dom";
import { useCart } from "../newcomponent/cartcontext";

export default function CategoryPage() {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]); // <-- plural for multiple products
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BaseURL}/api/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const savedCart = sessionStorage.getItem("cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    setAddedProducts(parsedCart.map((item) => item._id));
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProducts((prev) => [...prev, product._id]);
  };

  const handleRemoveFromCart = (_id) => {
    removeFromCart(_id);
    setAddedProducts((prev) => prev.filter((id) => id !== _id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center capitalize mb-6">{category}</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center">No products found in this category.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <div className="relative w-full h-36">
                <Link to={`/singleproduct/${product._id}`}>
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="w-full object-contain h-full rounded-lg transform hover:scale-105 transition-all duration-500"
                  />
                </Link>
                <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
                  New
                </span>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-sm lg:text-xl font-bold text-cyan-800 line-clamp-1 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-cyan-600 mt-1">{product.category}</p>
                <p className="text-xs text-cyan-500 mt-2 font-medium">
                  Design Code: <span className="font-semibold">{product.code}</span>
                </p>

                {addedProducts.includes(product._id) ? (
                  <button
                    onClick={() => handleRemoveFromCart(product._id)}
                    className="mt-4 w-full bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Remove from List ❌
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Add To List
                  </button>
                )}
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-100 rounded-full -mr-12 -mt-12 opacity-50" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
