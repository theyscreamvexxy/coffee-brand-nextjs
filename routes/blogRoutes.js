// routes/blogRoutes.js
// Purpose: Express.js router for blog API endpoints.
// Defines routes:
//   GET    /api/blog          -> blogController.getAllPosts
//   GET    /api/blog/:slug    -> blogController.getPostBySlug
//   POST   /api/blog          -> auth middleware -> blogController.createPost
//   PUT    /api/blog/:id      -> auth middleware -> blogController.updatePost
//   DELETE /api/blog/:id      -> auth middleware -> blogController.deletePost
