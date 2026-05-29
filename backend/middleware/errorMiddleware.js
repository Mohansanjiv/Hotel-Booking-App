const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500);

  res.json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
