const { body } = require("express-validator");

exports.register = [
  body("first_name").trim(),
  body("email").trim().isEmail().withMessage("Neteisingas el. pašto formatas"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 32 })
    .withMessage("Slaptažodį turi sudaryti ne mažiau kaip 6 simboliai"),
];

exports.login = [
  body("email").trim().isEmail().withMessage("Neteisingas el. pašto formatas"),
];
