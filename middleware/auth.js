// middleware/auth.js
// Purpose: Express.js authentication middleware.
// Validates JWT tokens from the Authorization header.
// Attaches the decoded user payload to req.user on success; returns 401 on failure.
// Used to protect admin-only write routes.
