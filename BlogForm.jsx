import react, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function BlogForm() {
  const [id] = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: "Fitness"
  });

  const [error, setError] = useState("");

  useEffect(() => { if (!id) return;
    API.get('/blogs/${id}').then((response) => {const blog = response.data;

      setForm({
        title: blog.title,
        content: blog.content,
        image: blog.image || "",
        category: blog.category || "Fitness"
      });
    }).catch(() => setError("Unable to load blog."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (id) {
        await API.put('/blogs/${id}', form);
      } else {
        await API.post("/blogs", form);
      }

      navigate("/blogs")

    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save blog."
      );
    }
  };

  return (
    <div> className="blog-form-container">
      <h1>{id ? "Edit Blog" : "Create New Blog"}</h1>

      {error && <p className="error">{erro}r</p>}
       <form onSubmit={handleSubmit}>
        <input name="title"
               placeholder="Blog Title"
               value={form.title}
               onChange={handleChange}
               required
        />

        <textarea
          name="content"
          placeholder="Write your blog content..." 
          value={form.content}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.image}
          onChange={handleChange}
          
        >

          <option value="Fitness">Fitness</option>
          <option value="Workout">Workout</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Weight-Loss">Weight-Loss</option>

        </select>

        <button type="submit">
          {id? "Update Blog" : "Publish Blog"}

        </button>
      </form>
    </div>
  );

}

export default BlogForm;

          
          





      
    </div>
  )
  