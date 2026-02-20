const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async function (req, res) {
    try {
        const result = await pool.query("SELECT * FROM categories");
        res.render("index", { categories: result.rows });
    } catch (err) {
        console.error(err)
        res.status(500).send("Error loading homepage")
    }
});

module.exports = router;