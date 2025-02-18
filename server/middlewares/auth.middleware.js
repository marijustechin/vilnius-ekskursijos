const ApiError = require("../exceptions/api.errors");
const tokenService = require("../services/token.service");

// module.exports = function (req, res, next) {
//   try {
//     // cia turi buti prikabintas tokenas
//     const authorizationHeader = req.headers.authorization;

//     console.log(authorizationHeader);

//     if (!authorizationHeader) throw new ApiError.UnauthorizedError();

//     const accessToken = authorizationHeader.split(" ")[1];

//     if (!accessToken) throw new ApiError.UnauthorizedError();

//     const userData = tokenService.validateAccessToken(accessToken);

//     if (!userData) throw new ApiError.UnauthorizedError();

//     req.user = userData;
//     next();
//   } catch (e) {
//     return next(ApiError.UnauthorizedError());
//   }
// };

// module.exports = function isAdmin(req, res, next) {};
class AuthMiddleware {
  async isAdmin(req, res, next) {
    try {
      // cia turi buti prikabintas tokenas
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) throw new ApiError.UnauthorizedError();

      const accessToken = authorizationHeader.split(" ")[1];

      if (!accessToken) throw new ApiError.UnauthorizedError();

      // userData yra visi token payload duomenys
      const userData = tokenService.validateAccessToken(accessToken);

      if (!userData) throw new ApiError.UnauthorizedError();

      if (userData.role !== "ADMIN") throw new ApiError.UnauthorizedError();

      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError(e));
    }
  }

  async isAuthenticated(req, res, next) {
    try {
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError(e));
    }
  }
}

module.exports = new AuthMiddleware();
