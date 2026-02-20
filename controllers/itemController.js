const pool = require("../db/pool");

exports.item_create_get = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.render("item_form", { categories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

exports.item_create_post = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;

    await pool.query(
      "INSERT INTO items (name, description, price, category_id) VALUES ($1, $2, $3, $4)",
      [name, description, price, category_id]
    );

    res.redirect(`/categories/${category_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating item");
  }
};

exports.getItemDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT items.*, categories.name AS category_name
       FROM items
       JOIN categories ON items.category_id = categories.id
       WHERE items.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Item not found");
    }

    res.render("item_detail", { item: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

exports.editItemForm = async (req, res) => {
  try {
    const { id } = req.params;

    const itemResult = await pool.query("SELECT * FROM items WHERE id = $1", [id]);

    if (itemResult.rows.length === 0) {
      return res.status(404).send("Item not found");
    }

    const categoriesResult = await pool.query("SELECT * FROM categories");

    res.render("item_edit_form", {
      item: itemResult.rows[0],
      categories: categoriesResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

exports.editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;

    await pool.query(
      "UPDATE items SET name = $1, description = $2, price = $3, category_id = $4 WHERE id = $5",
      [name, description, price, category_id, id]
    );

    res.redirect(`/items/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await pool.query("SELECT category_id FROM items WHERE id = $1", [id]);

    if (item.rows.length === 0) {
      return res.status(404).send("Item not found");
    }

    const category_id = item.rows[0].category_id;

    await pool.query("DELETE FROM items WHERE id = $1", [id]);

    res.redirect(`/categories/${category_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
};