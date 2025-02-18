const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "pranesimas del vardo",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Toks el. pasto adresas jau naudojamas",
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "El. pastas privalomas",
        },
        notEmpty: {
          msg: "El. pastas privalomas",
        },
        isEmail: {
          msg: "Neteisingas el. pasto formatas",
        },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }),
    sequelize.define(
      "role",
      {
        role_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      // nereikia automatiniu updated_at, created_at
      { timestamps: false }
    ),
    sequelize.define("user_secret", {
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slaptazodis privalomas",
          },
          notEmpty: {
            msg: "Slaptazodis privalomas",
          },
        },
      },
    }),
    sequelize.define("token", {
      refreshToken: { type: DataTypes.TEXT, allowNull: false },
    });
};
