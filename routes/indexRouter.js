const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async function (req, res) {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.render("index", { categories: result.rows });
  } catch (err) {
    console.error("RENDER ERROR:", err);
    res.status(500).send(`<pre>${err.stack}</pre>`);
  }
});

module.exports = router;
