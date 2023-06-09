/* eslint-disable no-unused-vars */
exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } 

  if (process.env.NODE_ENV === "PRODUCTION") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};