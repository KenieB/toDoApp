const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const todoItemsService = require("./todo.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Request Validations

function reqHasAccessTokenCookie(req, res, next) {
  const methodName = "reqHasAccessTokenCookie";
  req.log.debug({ __filename, methodName, cookies: req.cookies });
  const { access_token = {} } = req.cookies;
  if (access_token) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.accessToken = access_token;
    return next();
  }
  const message =
    "Request must have cookie for session access. Login or register to validate session access.";
  next({ status: 401, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message, req.cookies);
}

function bodyHasData(req, res, next) {
  const methodName = "bodyHasData";
  req.log.debug({ __filename, methodName, body: req.body });
  const { data = {} } = req.body;
  if (data) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.data = data;
    return next();
  }
  const message = "Request body must include data property.";
  next({ status: 400, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

//CRUD methods
async function list(req, res) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });
  //const authenticatedUser = res.locals.authenticated_user;
  const data = await todoItemsService.list(userId);
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: [reqHasAccessTokenCookie, bodyHasData],
};
