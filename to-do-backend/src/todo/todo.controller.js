const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const todoItemsService = require("./todo.service");

//CRUD methods
async function list(req, res) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });
  //const authenticatedUser = res.locals.authenticated_user;
  const data = await todoItemsService.list();
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
