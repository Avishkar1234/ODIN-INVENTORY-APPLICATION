const pool = require("../db/pool");

async function getAllCategories(req, res) {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.render("categories", { categories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

async function getCategoryDetail(req, res) {
  try {
    const { id } = req.params;

    const categoryResult = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(404).send("Category not found");
    }

    const itemsResult = await pool.query(
      "SELECT * FROM items WHERE category_id = $1",
      [id]
    );

    res.render("category_detail", {
      category: categoryResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

async function createCategoryForm(req, res) {
  res.render("category_form");
}

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2)",
      [name, description]
    );

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating category");
  }
}

async function editCategoryForm(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Category not found");
    }

    res.render("category_edit_form", { category: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
}

async function editCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
      [name, description, id]
    );

    res.redirect(`/categories/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating category");
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    // CASCADE is handled by the database constraint,
    // but we delete items manually here to be safe
    await pool.query("DELETE FROM items WHERE category_id = $1", [id]);
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);

    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting category");
  }
}

module.exports = {
  getAllCategories,
  getCategoryDetail,
  createCategory,
  createCategoryForm,
  editCategoryForm,
  editCategory,
  deleteCategory,
};