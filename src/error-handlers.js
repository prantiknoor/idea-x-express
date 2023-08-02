const { HttpError } = require("./utils");

const globalErrorHandler = (error, _req, res, _next) => {
    if (error.status) {
        res.status(error.status).json({ message: error.message });
    } else {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!", errorMessage: error.message });
    }
};

const notFoundHandler = (_req, _res) => {
    throw new HttpError(404, "Not found");
};


module.exports = { globalErrorHandler, notFoundHandler };
