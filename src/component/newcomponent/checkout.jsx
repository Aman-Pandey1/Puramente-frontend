import { useState } from "react";
import axios from "axios";
import { useCart } from "./cartcontext";
import BaseURL from "../../baseurl";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FlagIcon } from "react-flag-kit";
import * as XLSX from "xlsx";

// Country options with flags and codes
const countryOptions = [
  { value: "US", label: "United States", flag: "US" },
  { value: "IN", label: "India", flag: "IN" },
  { value: "GB", label: "United Kingdom", flag: "GB" },
  { value: "CA", label: "Canada", flag: "CA" },
  { value: "AU", label: "Australia", flag: "AU" },
  { value: "DE", label: "Germany", flag: "DE" },
  { value: "FR", label: "France", flag: "FR" },
  { value: "IT", label: "Italy", flag: "IT" },
  { value: "ES", label: "Spain", flag: "ES" },
  { value: "JP", label: "Japan", flag: "JP" },
  { value: "BR", label: "Brazil", flag: "BR" },
  { value: "CN", label: "China", flag: "CN" },
  { value: "RU", label: "Russia", flag: "RU" },
  { value: "ZA", label: "South Africa", flag: "ZA" },
  { value: "MX", label: "Mexico", flag: "MX" },
  { value: "KR", label: "South Korea", flag: "KR" },
  { value: "SG", label: "Singapore", flag: "SG" },
  { value: "CH", label: "Switzerland", flag: "CH" },
  { value: "AT", label: "Austria", flag: "AT" },
  { value: "PT", label: "Portugal", flag: "PT" },
  { value: "DK", label: "Denmark", flag: "DK" },
  { value: "SE", label: "Sweden", flag: "SE" },
  { value: "AR", label: "Argentina", flag: "AR" },
  { value: "NO", label: "Norway", flag: "NO" },
  { value: "NZ", label: "New Zealand", flag: "NZ" },
  { value: "NL", label: "Netherlands", flag: "NL" },
  { value: "TR", label: "Turkey", flag: "TR" },
  { value: "IL", label: "Israel", flag: "IL" },
  { value: "PL", label: "Poland", flag: "PL" },
  { value: "RO", label: "Romania", flag: "RO" },
  { value: "GR", label: "Greece", flag: "GR" },
  { value: "HU", label: "Hungary", flag: "HU" },
  { value: "IE", label: "Ireland", flag: "IE" },
  { value: "LT", label: "Lithuania", flag: "LT" },
  { value: "LU", label: "Luxembourg", flag: "LU" },
  { value: "MC", label: "Monaco", flag: "MC" },
];

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    contactNumber: "",
    message: "",
    companyName: "",
    country: "",
    companyWebsite: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (id, value) => {
    if (value < 1) {
      setErrors((prev) => ({ ...prev, [id]: "Minimum order quantity is 50" }));
      updateQuantity(id, 1);
    } else {
      setErrors((prev) => ({ ...prev, [id]: "" }));
      updateQuantity(id, value);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption ? selectedOption.value : "",
    });
  };

  const generateExcelFile = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [["Product Name", "SKU", "Quantity"]];

    cartItems.forEach((item) => {
      wsData.push([item.name, item.code, item.quantity]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Order Details");

    const excelBase64 = XLSX.write(wb, { bookType: "xlsx", type: "base64" });
    return excelBase64;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const excelFileBase64 = generateExcelFile();

    try {
      const backendResponse = await axios.post(
        `${BaseURL}/api/orders/submit-order`,
        {
          ...formData,
          orderDetails: cartItems.map((item) => ({
            name: item.name,
            sku: item.code,
            quantity: item.quantity,
            imageurl: item.imageurl,
          })),
          attachment: excelFileBase64,
        }
      );

      const { downloadLink } = backendResponse.data;
      console.log(downloadLink);

      cartItems.forEach((item) => removeFromCart(item._id));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        `Failed to send order request: ${
          error.response?.data?.error || error.message || "Try again."
        }`
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-12">
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 bg-cyan-200 p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
          <h2 className="text-lg font-semibold text-center">
            Your price request form has been submitted successfully.! 🎉 We'll
            update you soon with shipping details. Thank you for shopping with
            us!
          </h2>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left Section - Selected Items */}
        <div className="lg:w-1/2 p-8 bg-gradient-to-br from-white to-cyan-50 w-full">
          <h2 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center sm:text-left">
            Selected Items
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">No items in the cart.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-cyan-200 p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6 bg-white shadow-md hover:shadow-lg mb-4"
              >
                <img
                  src={item.imageurl}
                  alt="Product"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm transform hover:scale-105"
                />
                <div className="flex-grow text-center sm:text-left">
                  <p className="font-semibold text-xl text-cyan-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-cyan-500 mt-2 italic">
                    SKU: {item.code}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0 relative">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item._id,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="p-2 bg-cyan-100 text-cyan-600 rounded-full hover:bg-cyan-200"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      className="w-12 sm:w-16 border border-cyan-300 rounded-lg text-center py-2 bg-white text-cyan-700 font-medium"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, Number(e.target.value))
                      }
                    />
                    {errors[item.id] && (
                      <p className="text-red-500 text-xs absolute top-12 left-0">
                        {errors[item.id]}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="p-2 bg-cyan-100 text-cyan-600 rounded-full hover:bg-cyan-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section - Order Form */}
        <div className="lg:w-1/2 p-8 bg-white w-full">
          <h2 className="text-3xl font-extrabold text-cyan-600 mb-6 text-center sm:text-left">
            Price Request Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-cyan-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full border border-cyan-300 rounded-lg p-3 mt-2"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-cyan-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-cyan-300 rounded-lg p-3 mt-2"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-700">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                className="w-full border border-cyan-300 rounded-lg p-3 mt-2"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs">{errors.contactNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-cyan-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="w-full border border-cyan-300 rounded-lg p-3 mt-2"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-cyan-700">
                  Country *
                </label>
                <Select
                  options={countryOptions}
                  onChange={handleCountryChange}
                  getOptionLabel={(option) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FlagIcon
                        code={option.flag}
                        size={24}
                        style={{ marginRight: 8 }}
                      />
                      {option.label}
                    </div>
                  )}
                  getOptionValue={(option) => option.value}
                  placeholder="Select Country"
                  value={countryOptions.find(
                    (option) => option.value === formData.country
                  )}
                  required
                  className="w-full border border-cyan-300 rounded-lg mt-2"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#ffffff",
                      borderColor: "#e5e7eb",
                      borderRadius: "0.5rem",
                      padding: "0.25rem",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#ffffff",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }),
                  }}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-700">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                className="w-full border border-cyan-300 rounded-lg p-3 mt-2"
                value={formData.companyWebsite}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-700">
                Message
              </label>
              <textarea
                name="message"
                className="w-full border border-cyan-300 rounded-lg p-3 mt-2 min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Send Your Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
