const router = require("express").Router({ mergeParams: true });
const controller = require("./todo.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:userId([0-9]+)")
  .get(controller.list)
  .post(controller.create)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/:userId([0-9]+)/tags")
  .post(controller.updateTags)
  .all(methodNotAllowed);
//add tag delete if time

module.exports = router;
