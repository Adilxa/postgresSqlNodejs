const db = require("../db/db");

class PostController {
  async createPost(req, res) {
    const { title, content, user_id } = req.body;
    console.log(title);
    const newPost = await db.query(
      "INSERT INTO post (title , content, user_id) values ($1 , $2 , $3) RETURNING *",
      [title, content, user_id]
    );
    res.json(newPost.rows[0]);
  }
  async getPostByUser(req, res) {
    const id = req.query.id;
    //post?id=2
    const posts = await db.query("SELECT * FROM post where user_id = $1", [id]);
    res.json(posts.rows);
  }
}

module.exports = new PostController();
