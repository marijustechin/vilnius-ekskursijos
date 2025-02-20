const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const validator = require("../validators/user.validator");
// const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = new Router();

// naudotoju registracija
userRouter.post("/registration", validator.register, userController.register);

// naudotoju prisijungimas
userRouter.post("/login", validator.login, userController.login);

// naudotoju atsijungimas
userRouter.post("/logout", userController.logout);

// atnaujinam tokena
userRouter.post("/refresh", userController.refresh);

// naudotojas pagal id
// tik adminas ir pats naudotojas (id turi sutapti su prisijungusio id)
userRouter.get("/:id", userController.getUserById);

// visi naudotojai - tik adminas
userRouter.get("/", userController.getAllUsers);

module.exports = userRouter;
