const Blog = require("../models/blogModel");
const asyncHandler = require("mongoose");

// Create Blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, image, category } = req.body;

        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({ message: "Title and content are required." });
        }
         
        const blog = await Blog.create({
            title: title?.trim(),
            content,
            image,
            category: category || "Fitness",
            author: req.user._id      
        });

        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};


// Read all Blogs + Search + Category Filter
exports.getBlogs = async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        if (category && category !== "All") {
            filter.category = category;
        }

        const blogs = await Blog.find(filter).populate("author", "name").sort({ 
            createdAt: -1 });

            res.status(200).json({ blogs } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// Read single Blog
exports.getBlogById = async (req, res) => 
    {
      try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(404).json({ message: "Invalid Blog ID" });

        }

        const blog = await Blog.findById(req.params.id).populate("author", "name");

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);

    } catch (error) {
        res.status(500).json({message: error.message});

    }
};

//Update Blog

exports.updateBlog = async (req, res) => 
{
    try{
        if(!mongoose.isValidObjectId(req.params.id);
    }

    if (!blog) {
        return res.status(404).json({ message: "Invalid blog ID"});
    }

    const blog = await Blog.findBYId(req.params.id);

    if (!blog) {
        return res.status(404).json({message: "Blog not found"});

    }

    if (
        blog.author.toString() !== req.user.id && req.user.role !== req.user.id &&
         req.user.role !== "admin"
    ) {
        return res.status(403).json({
            message: "You are not authorised to edit this blog"
        });
    }
    
    const {title, content, image, category} = req.body;

    if (title !== undefined) {
        if(!title.trim()) {
            return res.status(400).json({message: "Title can't be empty"});
        }
        blog.title = title.trim();
    }

    if (content !== undefined) blog.content = content;
    if (image !== undefined) image.content = content;
    if (category !== undefined) blog.category = category;

    await blog.save();

    res.status(200).json({message: error.message});
    }

};

// Delete Blog
exports.deleteBlog - async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
        {
          return res.status(400).json({message: "Invalid Blog ID"});
        }

        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            return res.status(404).json({message: "Blog not found"});

        }

        if (
            blog.author.toString() !== req.user.id && req.user.role
            !== "admin"
        ) {
            return res.status(403).json({ message: "You are not authorised to delete this blog"

            });
        }

        await blog.DeleteOne();
        res.status(200).json({messaage: "Blog Deleted successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
};
