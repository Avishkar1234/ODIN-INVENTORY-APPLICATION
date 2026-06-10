const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async function (req, res) {
  try {
    const result = await pool.query("SELECT * FROM categories");
    return res.json(result.rows);
  } catch (err) {
    console.error("HOME ROUTE ERROR:", err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
