const router = require("express").Router({ mergeParams: true });
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").all(methodNotAllowed);

router.route("/register").post(controller.create).all(methodNotAllowed);

router.route("/login").post(controller.read).all(methodNotAllowed);

module.exports = router;
