import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseURL from "../../../baseurl"; // Adjust as needed

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BaseURL}/api/blogs`);
        if (res.data.blogs) {
         const found = res.data.blogs.find((b) => b._id.toString() === id);

          setBlog(found);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;

  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      {blog.image && (
        <img
          src={`${BaseURL}${blog.image}`}
          alt="Blog"
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-800">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
