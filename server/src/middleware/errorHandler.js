/**
 * Centralized error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  
  return res.status(statusCode).json({
    success: false,
    message: err.message || "We couldn't process your request right now. Please try again.",
  });
};
