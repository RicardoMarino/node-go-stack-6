const express = require("express");
const routes = express.Router();
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const authMiddleware = require("./app/middleware/auth");
const guestMiddleware = require("./app/middleware/guest");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashBoardController = require("./app/controllers/DashBoardController");
const FileController = require("./app/controllers/FileController");
const AppointmentsController = require("./app/controllers/AppointmentsController");

routes.use((req, res, next) => {
  res.locals.flashSucess = req.flash("success");
  res.locals.flashError = req.flash("error");
  return next();
});

routes.use("/app", authMiddleware);

routes.get("/files/:file", FileController.show);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.get("/app/dashboard", DashBoardController.index);
routes.get("/app/appointments/new/:provider", AppointmentsController.create);

routes.get("/app/logout", SessionController.destroy);

module.exports = routes;
