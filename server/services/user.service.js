const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const { user, role, user_secret } = sequelize.models;
const ApiError = require("../exceptions/api.errors");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");

class UserService {
  async #getUserByEmail(email) {
    return await user.findOne({
      where: { email },
      include: user_secret,
    });
  }

  async #getRoleId() {
    const roleId = await role.findOne({ where: { role_name: "USER" } });

    if (roleId) {
      return roleId.id;
    } // nei nera, sukuriam
    else {
      const defaultRole = await role.create({ role_name: "USER" });

      return defaultRole.id;
    }
  }

  /**
   * Naudotojo registracija
   * @param {*} first_name
   * @param {*} email
   * @param {*} password
   * @returns pranesima
   */
  async register(first_name, email, password) {
    // tikrinam ar el. pasto adresas neuzimtas
    const existingUser = await user.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser)
      throw ApiError.BadRequest(`El. pašto adresas ${email} jau naudojamas`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const transaction = await sequelize.transaction();
    try {
      // cia naudojam tranzakcijas
      // nes rasom duomenis i dvi lenteles
      await user.create(
        {
          first_name,
          email,
          role_id: await this.#getRoleId(),
          user_secret: [{ password: hashedPassword }],
        },
        {
          include: [user_secret],
          transaction,
        }
      );
      await transaction.commit();
      return { message: "Registracija sėkminga. Prašome prisijungti." };
    } catch (e) {
      await transaction.rollback();
      throw ApiError.BadRequest("Registracija nepavyko.");
    }
  }

  /**
   * Naudotojo prisijungimas
   * @param {*} email
   * @param {*} password
   * @returns tokenus ir naudotojo duomenis
   */
  async login(email, password) {
    const activeUser = await this.#getUserByEmail(email);

    if (!activeUser)
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );

    const valid = await bcrypt.compare(
      password,
      activeUser.user_secret.password
    );

    if (!valid) {
      throw ApiError.BadRequest(
        `Neteisingas el. pašto adresas arba slaptažodis`
      );
    }

    const userDto = await UserDto.init(activeUser);

    const tokens = tokenService.generateTokens({
      id: userDto.id,
      role: userDto.role,
    });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { id: userDto.id, role: userDto.role },
    };
  }

  async tokenRefresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const activeUser = await user.findOne({ where: { id: userData.id } });
    const userDto = await UserDto.init(activeUser);

    const tokens = tokenService.generateTokens({
      id: userDto.id,
      role: userDto.role,
    });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { id: userDto.id, role: userDto.role },
    };
  }

  async getUserById(id, refreshToken) {
    // 1 patikrinam, ar id ir id is tokeno sutampa arba refreshTokeno role yra adminas
  }

  /**
   * Naudotojo isregistravimas
   * @param {*} userId
   * @returns skaicius, kiek irasu istrinta
   */
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }
}

module.exports = new UserService();
