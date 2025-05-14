import { useEffect, useState } from "react";
import { Phone, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseURL from "../../baseurl";
import WhoWeAre from "../newcomponent/woweare";
import { useCart } from "../newcomponent/cartcontext";
import { Link } from "react-router-dom";

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart, cartItems, removeFromCart } = useCart();

  const isInCart = cartItems.some(item => item._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProduct() {
      try {
        const response = await axios.get(`${BaseURL}/api/products/single/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  const qualityImage = "/productquality.png";
  const assuranceImage = "/quality.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
            <img
              src={product.imageurl}
              alt={product.name}
              className="rounded-xl w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
            <p className="text-sm text-cyan-600 font-semibold tracking-wider animate-fade-in">
              Design Code: {product.code}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 animate-slide-up">
              {product.name}
            </h1>

            {/* Quantity Selector + Add/Remove Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
              {!isInCart && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xl hover:bg-cyan-700"
                  >
                    −
                  </button>
                  <span className="font-bold text-2xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xl hover:bg-cyan-700"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
                className={`${
                  isInCart
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
                } text-white px-6 py-4 rounded-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105 w-full sm:w-auto`}
              >
                {isInCart ? "Remove Item" : "Add to List"}
              </button>
            </div>

            <div className="mt-8 flex justify-around text-cyan-700">
              <button className="flex items-center hover:text-cyan-900 transition-colors duration-200 animate-pulse-slow">
                <Phone className="mr-2" size={24} /> Enquiry
              </button>
              <button className="flex items-center hover:text-cyan-900 transition-colors duration-200 animate-pulse-slow">
                <Share2 className="mr-2" size={24} /> Share
              </button>
            </div>

            <div className="mt-10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 animate-fade-in">
                {product.description}
              </h2>
            </div>
          </div>
        </div>

        {/* Product Quality Section */}
        <div className="mt-16 p-8 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-102">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-cyan-800 mb-6 animate-slide-up">
                Product Quality
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg animate-fade-in">
                Each {product.name} undergoes rigorous testing to ensure top quality...
              </p>
              <ul className="list-disc list-inside mt-6 text-gray-700 space-y-2">
                <li className="text-lg">Premium materials</li>
                <li className="text-lg">Advanced manufacturing</li>
                <li className="text-lg">Eco-conscious production</li>
                <li className="text-lg">Strict quality control</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={qualityImage}
                alt="Product Quality Check"
                className="rounded-xl w-full max-w-[400px] object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="mt-16 p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-102">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-cyan-800 mb-6 animate-slide-up">
                Quality Assurance
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg animate-fade-in">
                Our dedicated QA team ensures every product meets international standards...
              </p>
              <ul className="list-disc list-inside mt-6 text-gray-700 space-y-2">
                <li className="text-lg">ISO-certified facilities</li>
                <li className="text-lg">Ongoing audits</li>
                <li className="text-lg">User feedback loops</li>
                <li className="text-lg">24/7 quality support</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={assuranceImage}
                alt="Quality Assurance"
                className="rounded-xl w-full max-w-[400px] object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 p-8 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-102">
          <h2 className="text-3xl font-bold text-cyan-800 mb-6 animate-slide-up">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg animate-fade-in">
            Choosing {product.name} means investing in quality, innovation, and customer care.
          </p>
          <div className="mt-8">
            <Link to="/aboutus">
              <button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105">
                Learn More About Our Commitment
              </button>
            </Link>
          </div>
        </div>
      </div>
      <WhoWeAre />
    </div>
  );
}
