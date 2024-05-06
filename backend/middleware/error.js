 
export async  function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set the status code
  const statusCode = err.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

