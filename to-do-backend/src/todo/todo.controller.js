const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const todoItemsService = require("./todo.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.SECRET_KEY;

//Request Validations
function verifyToken(req, res, next) {
  const methodName = "verifyToken";
  req.log.debug({ __filename, methodName, cookies: req.cookies });
  const vToken = req.cookies["access_token"];
  if (!vToken) {
    const message =
      "No access token provided with request. Please login or register to access.";
    return next({ status: 403, message: message });
  }
  jwt.verify(vToken, jwtKey, (err, decoded) => {
    if (err) {
      const message = "Unauthorized user";
      req.log.trace({ __filename, methodName, valid: false }, message);
      return next({ status: 401, message: message });
    }
    res.locals.jwtId = Number(decoded.id);
    return next();
  });
}

/*
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
*/

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
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function bodyHasUserIdProperty(req, res, next) {
  const methodName = "bodyHasUserIdProperty";
  req.log.debug({ __filename, methodName });
  const { data: { user_id } = {} } = req.body;
  if (user_id) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.userId = Number(user_id);
    return next();
  }
  const message = "User request must include account ID";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function requestedIdMatchesAuthTokenId(req, res, next) {
  const methodName = "requestedIdMatchesAuthTokenId";
  const reqId = res.locals.userId;
  const authId = res.locals.jwtId;
  req.log.debug({
    __filename,
    methodName,
    currIdsAsNums: { requested: reqId, authenticated: authId },
  });
  if (reqId === authId) {
    req.log.trace({ __filename, methodName, valid: true });
    return next();
  }
  const message =
    "Requested user account does not match authenticated user account";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 401, message: message });
}

function bodyHasTitleProperty(req, res, next) {
  const methodName = "bodyHasTitleProperty";
  req.log.debug({ __filename, methodName });
  const { data: { title } = {} } = req.body;
  if (title) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newTitle = title;
    return next();
  }
  const message = "Request body data must include title property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function bodyHasDescriptionProperty(req, res, next) {
  const methodName = "bodyHasDescriptionProperty";
  req.log.debug({ __filename, methodName });
  const { data: { description } = {} } = req.body;
  if (description) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newDescription = description;
    return next();
  }
  const message = "Request body data must include description property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function bodyHasDueDateProperty(req, res, next) {
  const methodName = "bodyHasDueDateProperty";
  req.log.debug({ __filename, methodName });
  const { data: { due_date } = {} } = req.body;
  if (due_date) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newDueDate = due_date;
    return next();
  }
  const message = "Request body data must include due_date property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function bodyHasItemIdProperty(req, res, next) {
  const methodName = "bodyHasItemIdProperty";
  req.log.debug({ __filename, methodName });
  const { data: { item_id } = {} } = req.body;
  if (item_id) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.itemId = item_id;
    return next();
  }
  const message = "Request body data must include item_id property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function bodyHasNewTagProperty(req, res, next) {
  const methodName = "bodyHasNewTagProperty";
  req.log.debug({ __filename, methodName });
  const { data: { new_tag } = {} } = req.body;
  if (new_tag) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newTag = new_tag;
    return next();
  }
  const message = "Request body data must include new_tag property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

async function itemExists(req, res, next) {
  const methodName = "itemExists";
  req.log.debug({ __filename, methodName });
  const itemIds = {
    itemId: res.locals.itemId,
    userId: res.locals.userId,
  };
  const tdItem = await todoItemsService.read(itemIds);
  if (tdItem) {
    req.log.trace({ __filename, methodName, valid: true, item: tdItem });
    res.locals.tdItem = tdItem;
    return next();
  }
  const message = `Cannot find item_id #${res.locals.itemId} belonging to user_id #${res.locals.userId}.`;
  next({ status: 404, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function newTagIsNotExistingItemTag(req, res, next) {
  const methodName = "newTagIsNotExistingItemTag";
  const exstItemTags = res.locals.tdItem.tags;
  const exstItemTagsCaseCtrld = exstItemTags.map((tag) => tag.toLowerCase());
  req.log.debug({
    __filename,
    methodName,
    tags: { asStored: exstItemTags, caseCtrld: exstItemTagsCaseCtrld },
  });
  if (!exstItemTagsCaseCtrld.includes(res.locals.newTag.toLowerCase())) {
    req.log.trace({ __filename, methodName, valid: true });
    return next();
  }
  const message = `Tag '${res.locals.newTag}' already exists for to-do list item #${res.locals.itemId}.`;
  next({ status: 404, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

//CRUD methods
async function list(req, res) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });
  const userId = res.locals.userId;
  const data = await todoItemsService.list(userId);
  req.log.trace({ __filename, methodName, return: true });
  res.json({ data });
}

async function create(req, res) {
  const methodName = "create";
  const newItem = {
    user_id: res.locals.userId,
    title: res.locals.newTitle,
    description: res.locals.newDescription,
    "due-date": res.locals.newDueDate,
  };
  req.log.debug({ __filename, methodName, newItem: newItem });
  const data = await todoItemsService.create(newItem);
  req.log.trace({ __filename, methodName, return: true });
  res.json({ data });
}

async function updateTags(req, res) {
  const methodName = "updateTags";
  const update = {
    itemId: res.locals.itemId,
    newTag: res.locals.newTag,
  };
  req.log.debug({ __filename, methodName, update: update });
  const data = await todoItemsService.updateTags(update);
  req.log.trace({ __filename, methodName, return: true });
  res.json({ data });
}

async function destroy(req, res) {
  const methodName = "destroy";
  req.log.debug({ __filename, methodName, table: res.locals.table });

  const itemId = res.locals.itemId;
  await todoItemsService.delete(itemId);

  const data = await todoItemsService.list(res.locals.userId);

  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: [
    asyncErrorBoundary(verifyToken),
    bodyHasData,
    bodyHasUserIdProperty,
    requestedIdMatchesAuthTokenId,
    asyncErrorBoundary(list),
  ],
  create: [
    asyncErrorBoundary(verifyToken),
    bodyHasData,
    bodyHasUserIdProperty,
    requestedIdMatchesAuthTokenId,
    bodyHasTitleProperty,
    bodyHasDescriptionProperty,
    bodyHasDueDateProperty,
    asyncErrorBoundary(create),
  ],
  updateTags: [
    asyncErrorBoundary(verifyToken),
    bodyHasData,
    bodyHasUserIdProperty,
    requestedIdMatchesAuthTokenId,
    bodyHasItemIdProperty,
    bodyHasNewTagProperty,
    asyncErrorBoundary(itemExists),
    newTagIsNotExistingItemTag,
    asyncErrorBoundary(updateTags),
  ],
  delete: [
    asyncErrorBoundary(verifyToken),
    bodyHasData,
    bodyHasUserIdProperty,
    requestedIdMatchesAuthTokenId,
    bodyHasItemIdProperty,
    asyncErrorBoundary(itemExists),
    asyncErrorBoundary(destroy),
  ],
};
