const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const ApiError = require('../exceptions/api.errors');
const tokenService = require('../services/token.service');

class UserController {
  /**
   * Naudotojo registracija
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns tokenus ir naudotojo duomenis
   */
  async register(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw ApiError.BadRequest('Validacijos klaida', errors.array());

      const { first_name, email, password } = req.body;

      const newUser = await userService.register(first_name, email, password);

      return res.status(200).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Naudotojo prisijungimas
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns tokenus ir naudotojo duomenis arba pranesima apie klaida
   */
  async login(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw ApiError.BadRequest('Validacijos klaida', errors.array());

      // jei nera validacijos klaidu, tesiam
      const { email, password } = req.body;

      const loggedUser = await userService.login(email, password);

      // refreshToken dedam i cookies
      res.cookie('refreshToken', loggedUser.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        // httpOnly pasako serveriui, kad cookie esanti informacija
        // neturi buti siunciama uz serverio ribu
        // ir kad serveris turi nerodyti, kas viduje
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ accessToken: loggedUser.accessToken, user: loggedUser.user });
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw ApiError.UnauthorizedError();

      // patikrinam, ar tokenas validus
      const userData = tokenService.validateRefreshToken(refreshToken);

      if (!userData) throw ApiError.BadRequest('Neteisinga užklausa');

      await userService.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'Atsijungimas sėkmingas.' });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        res.clearCookie('refreshToken'); // sena tikrai ismetam
        throw ApiError.UnauthorizedError('Neprisijungęs naudotojas');
      }

      const userData = await userService.tokenRefresh(refreshToken);

      if (!userData) {
        res.clearCookie('refreshToken'); // Ismetam netinkama tokena
        throw ApiError.UnauthorizedError();
      }

      //
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Produksine apsaugom
        sameSite: 'Strict',
      });

      return res
        .status(200)
        .json({ accessToken: userData.accessToken, user: userData.user });
    } catch (e) {
      res.clearCookie('refreshToken'); // Visada istrinam nereikalinga tokena
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw ApiError.UnauthorizedError();

      const userData = await userService.getUserById(id, refreshToken);

      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getAllUsers(req, res, next) {
    return res.status(200).json('visi useriai');
  }
}

module.exports = new UserController();
