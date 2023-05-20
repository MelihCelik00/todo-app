function authLayer(req, res, next) {
    // Middleware logic goes here
    // For example, you can add authentication or authorization logic
  
    // Call the next middleware in the chain
    next();
  }
  
  module.exports = authLayer;
  