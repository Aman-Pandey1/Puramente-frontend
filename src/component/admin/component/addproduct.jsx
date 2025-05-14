import React, { useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard";
import BaseURL from "../../../baseurl";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    code: "",
    subcategory: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("code", product.code);
    formData.append("subcategory", product.subcategory); // added field
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${BaseURL}/api/products/admin/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Product added successfully:", response.data);
        navigate("/dashboard");
      } else {
        console.error("Failed to add product:", response);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
      <div className="max-w-lg mx-auto my-4 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="Ring">Ring</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Earring">Earring</option>
              <option value="Necklace">Necklace</option>
              <option value="Pendant">Pendant</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            >
              <option value="">Select subcategory</option>
              <option value="With Gemstone">With Gemstone</option>
              <option value="Without Gemstone">Without Gemstone</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Product Code
            </label>
            <input
              name="code"
              value={product.code}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
