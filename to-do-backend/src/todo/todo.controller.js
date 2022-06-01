const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const todoItemsService = require("./todo.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.SECRET_KEY;

//Request Validations
async function verifyToken(req, res, next) {
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

function reqParamIdMatchesTokenId(req, res, next) {
  const methodName = "reqParamIdMatchesTokenId";
  const reqId = Number(req.params.userId);
  const authId = res.locals.jwtId;
  req.log.debug({
    __filename,
    methodName,
    currIdsAsNums: { requested: reqId, authenticated: authId },
  });
  if (reqId === authId) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.userId = reqId;
    return next();
  }
  const message =
    "Requested user account does not match authenticated user account";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 401, message: message });
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
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function dataHasTitleProperty(req, res, next) {
  const methodName = "dataHasTitleProperty";
  req.log.debug({ __filename, methodName });
  const { title = {} } = res.locals.data;
  if (title) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newTitle = title;
    return next();
  }
  const message = "Request body data must include title property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function dataHasDescriptionProperty(req, res, next) {
  const methodName = "dataHasDescriptionProperty";
  req.log.debug({ __filename, methodName });
  const { description = {} } = res.locals.data;
  if (description) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newDescription = description;
    return next();
  }
  const message = "Request body data must include description property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function dataHasDueDateProperty(req, res, next) {
  const methodName = "dataHasDueDateProperty";
  req.log.debug({ __filename, methodName });
  const { due_date = {} } = res.locals.data;
  if (due_date) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.newDueDate = due_date;
    return next();
  }
  const message = "Request body data must include due_date property.";
  req.log.trace({ __filename, methodName, valid: false }, message);
  next({ status: 400, message: message });
}

function dataHasItemIdProperty(req, res, next) {
  const methodName = "dataHasItemIdProperty";
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

function dataHasNewTagProperty(req, res, next) {
  const methodName = "dataHasNewTagProperty";
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
  res
    .append("Access-Control-Allow_Origin", "http://localhost:3000/")
    .json({ data });
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
  res.append("Access-Control-Allow_Origin", "http://localhost:3000/").json({ data });
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
  res.append("Access-Control-Allow_Origin", "http://localhost:3000/").json({ data });
}

async function destroy(req, res) {
  const methodName = "destroy";
  rkeq.log.debug({ __filename, methodName, table: res.locals.table });

  const itemId = res.locals.itemId;
  await todoItemsService.delete(itemId);

  const data = await todoItemsService.list(res.locals.userId);

  res.append("Access-Control-Allow_Origin", "http://localhost:3000/").json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: [
    asyncErrorBoundary(verifyToken),
    reqParamIdMatchesTokenId,
    asyncErrorBoundary(list),
  ],
  create: [
    asyncErrorBoundary(verifyToken),
    reqParamIdMatchesTokenId,
    bodyHasData,
    dataHasTitleProperty,
    dataHasDescriptionProperty,
    dataHasDueDateProperty,
    asyncErrorBoundary(create),
  ],
  updateTags: [
    asyncErrorBoundary(verifyToken),
    reqParamIdMatchesTokenId,
    bodyHasData,
    dataHasItemIdProperty,
    dataHasNewTagProperty,
    asyncErrorBoundary(itemExists),
    newTagIsNotExistingItemTag,
    asyncErrorBoundary(updateTags),
  ],
  delete: [
    asyncErrorBoundary(verifyToken),
    reqParamIdMatchesTokenId,
    bodyHasData,
    dataHasItemIdProperty,
    asyncErrorBoundary(itemExists),
    asyncErrorBoundary(destroy),
  ],
};
