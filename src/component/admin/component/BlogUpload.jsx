import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseURL from "../../../baseurl";

export default function BlogUpload() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${BaseURL}/api/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Blog uploaded successfully!");
        setBlog({ title: "", content: "" });
        setImage(null);
        setPreviewImage(null);

        // Delay navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMessage("❌ Blog upload failed.");
        console.error(response);
      }
    } catch (error) {
      console.error("Upload error:", error.response ? error.response.data : error.message);
      setMessage("❌ Error uploading blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Upload Blog</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded h-40"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3m3-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Select Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Upload Blog
        </button>
      </form>
    </div>
  );
}
