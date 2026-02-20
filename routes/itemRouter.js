const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/new", itemController.item_create_get);
router.post("/new", itemController.item_create_post);
router.get("/:id/edit", itemController.editItemForm);
router.post("/:id/edit", itemController.editItem);
router.post("/:id/delete", itemController.deleteItem);
router.get("/:id", itemController.getItemDetail);

module.exports = router;