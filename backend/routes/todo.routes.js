const Router = require("express");

const router = new Router();

const todoController = require("../controller/todo.controller");

router.post("/todo", todoController.createTodo);
router.get("/todo", todoController.getAllTodo);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
