import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BaseURL from "../../../baseurl";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BaseURL}/api/blogs`);
        if (res.data && res.data.blogs) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8); // Load 8 more each time
  };

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-[#004f6e] mb-10">
        Latest Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {blogs.slice(0, visibleCount).map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
          >
            {blog.image && (
              <img
                src={`${BaseURL}${blog.image}`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-semibold text-[#004f6e]">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              {blog.content.length > 80
                ? blog.content.slice(0, 80) + "..."
                : blog.content}
            </p>
         <Link
  to={`/blogs/${blog._id}`} // <-- FIXED
  className="inline-block mt-3 bg-[#004f6e] text-white px-4 py-2 rounded hover:bg-[#006d94] transition-colors text-sm"
>
  Read More
</Link>

          </div>
        ))}
      </div>

      {visibleCount < blogs.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleViewMore}
            className="bg-[#004f6e] text-white px-6 py-2 rounded-full hover:bg-[#006d94] transition-colors"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowBlogs;
