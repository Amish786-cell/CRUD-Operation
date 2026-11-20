import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import API from "../api";

const categories = [
    "All",  "Fitness", "Workout", "Nutrition", "Weight Loss"
];

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user") // "null");
    const fetchBlogs = async () => {
        try {
            const response = await API.get("/blogs", {
                params: { search, category }
            });

            setBlogs(response.data);
            setError("");
        } catch (err) {
              setError("Unable to retrieve blogs.");
        }
};

useEffect(() => {
    const timer = setTimeout(fetchBlogs, 300);
    return () => clearTimeout(timer);
}, [search, category]);

const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?"))
        return;
}

try {
    await API.delete('/blogs/${id}');
    fetchBlogs();
} catch (err) {
    alert(err.response?.data?.message || "Delete failed");
}
};

const canManage = (blog) => user && (user.role == "admin" || user.id === blog.author?._id);

return (
    <div className="blogs-container">
    <h1>FitnessGym Blogs</h1>

    <div className="blogs-controlers">
    <input
      type="text"
      placeholder="Search fitness blogs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      >

      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)
        >

        {categories.map((item) => (
            <option key={item} value={item}>
            {item}
            </option>
        ))}

      </select>

      <Link to="/blogs/create">Create New Blog</Link>
      </div>

      {error && <>p{error}</p>}

      <div className="blog-grid">
        {blogs.map((blog) => (
            <article className="blog-card" key={blog._id}>
            {blog.image} alt={blog.title} />
        )}

        <h2>{blog.title}</h2>
        <p>Category: {blog.category}</p>
        <p>Author: {blog.author?.name || "Unknown"}</p>
        <Link to={'/blogs/${blog._id}'}>Read More</Link>

        {canManage(blog) && (<div className="blog-actions">
            <Link to={'/blogs/edit/${blog._id}'}>Edit</Link>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
        )}
        </article>

      ))}

    </div>

    {blogs.length === 0 && !error && (
        <p>No blogs found</p>
    )}
   </div>
  );

}

export default Blogs;
