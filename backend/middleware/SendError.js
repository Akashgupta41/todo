// utils/responseError.js

/**
 * Send a formatted error response
 * @param {Object} res - The response object from Express.js
 * @param {number} statusCode - The HTTP status code to send
 * @param {string} message - The error message to send
 */
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message: message
      }
    });
  };
  
export default sendErrorResponse;

  
