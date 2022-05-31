const router = require("express").Router({ mergeParams: true });
const controller = require("./todo.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .put(controller.updateTags)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
