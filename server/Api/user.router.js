const Router = require("express").Router();
const auth = require("../middleware/auth");
const {createUser, getUsers, getUserById, login } = require("./user.controller");

Router.post("/", createUser)
Router.get("/all", getUsers)
Router.get("/",auth , getUserById)
Router.post("/login",login)

module.exports = Router