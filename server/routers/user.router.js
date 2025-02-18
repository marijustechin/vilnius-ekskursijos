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

// naudotoju sarasas - gali gauti tik autorizuoti naudotojai
// userRouter.get('/', userController.getAll);
// // naudotojas paga id
// userRouter.get('/:id', userController.getUserById);

// // sukuriam nauja
// userRouter.post('/', validator.register, userController.register);

// // prisijungimas
// userRouter.post('/login', validator.login, userController.login);

// // atsijungimas
// userRouter.post('/logout', userController.logout);

// // refresh token
// userRouter.post('/refresh', userController.refresh);

// // naudotojo modifikavimas
// userRouter.put('/:id', userController.updateUser);

// // istrinam
// userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
