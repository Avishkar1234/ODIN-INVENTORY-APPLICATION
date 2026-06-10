const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    return res.render("category_form", {
      categories: result.rows,
    });
  } catch (err) {
    return res.status(500).send(`<pre>${err.stack}</pre>`);
  }
});

module.exports = router;
