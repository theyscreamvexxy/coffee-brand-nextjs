// routes/productRoutes.js
// Purpose: Express.js router for product API endpoints.
// Defines routes:
//   GET    /api/products           -> productController.getAllProducts
//   GET    /api/products/:slug     -> productController.getProductBySlug
//   POST   /api/products           -> auth middleware -> productController.createProduct
//   PUT    /api/products/:id       -> auth middleware -> productController.updateProduct
//   DELETE /api/products/:id       -> auth middleware -> productController.deleteProduct
