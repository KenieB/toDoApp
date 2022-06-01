const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const usersService = require("./users.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.SECRET_KEY;

//Request Validations
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

function dataHasEmailProperty(req, res, next) {
  const methodName = "dataHasEmailProperty";
  req.log.debug({ __filename, methodName, data: res.locals.data });
  const { email = {} } = res.locals.data;
  if (email) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.userEmail = email;
    return next();
  }
  const message = "User must provide email address";
  next({ status: 400, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function dataHasPasswordProperty(req, res, next) {
  const methodName = "dataHasPasswordProperty";
  req.log.debug({ __filename, methodName, data: res.locals.data });
  const { password = {} } = res.locals.data;
  if (password) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.plaintextPassword = password;
    return next();
  }
  const message = "User must provide password";
  next({ status: 400, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function dataHasFirstNameProperty(req, res, next) {
  const methodName = "dataHasFirstNameProperty";
  req.log.debug({ __filename, methodName, data: res.locals.data });
  const { first_name = {} } = res.locals.data;
  if (first_name) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.firstName = first_name;
    return next();
  }
  const message = "User must provide first name for account registration";
  next({ status: 400, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function dataHasLastNameProperty(req, res, next) {
  const methodName = "dataHasLastNameProperty";
  req.log.debug({ __filename, methodName, data: res.locals.data });
  const { last_name = {} } = res.locals.data;
  if (last_name) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.lastName = last_name;
    return next();
  }
  const message = "User must provide last name for account registration";
  next({ status: 400, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

async function reqUserAlreadyExists(req, res, next) {
  const methodName = "reqUserAlreadyExists";
  const userEmail = res.locals.userEmail;
  req.log.debug({ __filename, methodName, user_email: userEmail });
  const existingUser = await usersService.read(userEmail);

  if (!existingUser) {
    req.log.trace({ __filename, methodName, valid: true });
    return next();
  }
  const message = `User with email ${userEmail} already exists. Please use login or sign up with a different email address.`;
  next({ status: 409, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

async function reqUserDoesNotExist(req, res, next) {
  const methodName = "reqUserDoesNotExist";
  const userEmail = res.locals.userEmail;
  req.log.debug({ __filename, methodName, user_email: userEmail });
  const existingUser = await usersService.read(userEmail);

  if (existingUser) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.exstUser = existingUser;
    return next();
  }
  const message = `User with email ${userEmail} does not exist. Please use sign up access To-Do App.`;
  next({ status: 409, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

//Security middleware
async function protectPassword(req, res, next) {
  const methodName = "protectPassword";
  const plaintextPassword = res.locals.plaintextPassword;
  req.log.debug({ __filename, methodName });
  const hashPass = await bcrypt.hash(plaintextPassword, 10);
  if (hashPass) {
    req.log.trace({ __filename, methodName, valid: true });
    res.locals.hashPass = hashPass;
    return next();
  }
  const message = `Server security error terminated user registration. Alert system admin.`;
  next({ status: 500, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

async function validatePassword(req, res, next) {
  const methodName = "validatePassword";
  const plaintextPassword = res.locals.plaintextPassword;
  const exstUserPassword = res.locals.exstUser.password;
  req.log.debug({ __filename, methodName });
  const passwordIsValid = await bcrypt.compare(
    plaintextPassword,
    exstUserPassword
  );
  if (passwordIsValid) {
    req.log.trace({ __filename, methodName, valid: true });
    return next();
  }
  const message = `Incorrect password. Please try again.`;
  next({ status: 403, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function endUserSession(req, res) {
  const methodName = "endUserSession";
  req.log.debug({ __filename, methodName, cookies: req.cookies });
  const accessToken = req.cookies["access_token"];
  if (accessToken) {
    res.clearCookie("access_token").sendStatus(204);
    req.log.trace({ __filename, methodName, valid: true });
  }
  res.sendStatus(204);
  req.log.trace({ __filename, methodName, valid: true });
}

//CRUD methods
async function create(req, res) {
  const methodName = "create";
  req.log.debug({ __filename, methodName });

  const reqNewUser = {
    first_name: res.locals.firstName,
    last_name: res.locals.lastName,
    email: res.locals.userEmail,
    password: res.locals.hashPass,
  };
  const newUser = await usersService.create(reqNewUser);

  if (newUser) {
    const token = jwt.sign({ id: newUser.user_id }, jwtKey);
    res
      .append("Access-Control-Allow_Origin", "http://localhost:3000/")
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({
        data: {
          user_id: newUser.user_id,
          user_name: newUser.first_name,
          access_token: token ? true : false,
        },
      });
    req.log.trace({
      __filename,
      methodName,
      return: true,
      access_token: token,
      user: newUser,
    });
  }
  const message = `User registration failed. Please contact system admin or try again.`;
  next({ status: 500, message: message });
  req.log.trace({ __filename, methodName, valid: false }, message);
}

function read(req, res) {
  const methodName = "read";
  req.log.debug({ __filename, methodName });
  const exstUser = res.locals.exstUser;
  const token = jwt.sign({ id: exstUser.user_id }, process.env.SECRET_KEY);
  res
    .append("Access-Control-Allow_Origin", "http://localhost:3000/")
    .cookie("access_token", token, { httpOnly: true })
    .json({
      data: {
        user_id: exstUser.user_id,
        user_name: exstUser.first_name,
        access_token: token ? true : falsek,
      },
    });
  req.log.trace({
    __filename,
    methodName,
    return: true,
    access_token: token,
    user: exstUser,
  });
}

module.exports = {
  create: [
    bodyHasData,
    dataHasEmailProperty,
    dataHasPasswordProperty,
    dataHasFirstNameProperty,
    dataHasLastNameProperty,
    asyncErrorBoundary(reqUserAlreadyExists),
    asyncErrorBoundary(protectPassword),
    asyncErrorBoundary(create),
  ],
  read: [
    bodyHasData,
    dataHasEmailProperty,
    dataHasPasswordProperty,
    asyncErrorBoundary(reqUserDoesNotExist),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(read),
  ],
  endUserSession
};
