const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {
    createBlog, 
    getBlogById, 
    getBlogs,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");



// Public routes
router.get('/', getBlogs);
router.get('/', getBlogById);


// Aunthicated Routes

router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:", protect, deleteBlog);



module.exports = router;