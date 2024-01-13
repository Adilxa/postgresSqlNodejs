const db = require("../db");

class TodoController {
  async createTodo(req, res) {
    const { completed, task } = req.body;

    const newTodo = await db.query(
      "INSERT INTO todo (completed , task) values ($1 , $2) RETURNING *",
      [completed, task]
    );
    res.json(newTodo.rows[0]);
  }

  async getAllTodo(req, res) {
    let { name } = req.query;

    let whereClause = "";
    let values = [];

    if (name) {
      whereClause += " WHERE task ILIKE $1";
      values.push(`%${name}%`);
    }
    const todos = await db.query(`SELECT * FROM todo${whereClause}`, values);
    res.json(todos.rows);
  }

  async deleteTodo(req, res) {
    const id = req.params.id;
    const todo = await db.query("DELETE FROM todo where id = $1", [id]);
    res.json(todo.rows[0]);
  }
}

module.exports = new TodoController();
