export default function (req, res, next) {
    res.error = function (statusCode) {
      res.statusCode = statusCode;
      next(new Error(`HTTP error ${statusCode}`));
    };

    next();
  }