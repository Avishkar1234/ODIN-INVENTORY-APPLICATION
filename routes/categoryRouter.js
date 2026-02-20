const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/new", categoryController.createCategoryForm);
router.post("/new", categoryController.createCategory);
router.get("/:id/edit", categoryController.editCategoryForm);
router.post("/:id/edit", categoryController.editCategory);
router.post("/:id/delete", categoryController.deleteCategory);
router.get("/:id", categoryController.getCategoryDetail);

module.exports = router;