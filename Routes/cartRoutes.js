const { Router } = require("express");
const {
  addCart,
  removeCart,
  getCarts,
} = require("../Controllers/cartsController");
const router = Router();

router.get("/", getCarts);
router.get("/addCart", addCart);
router.delete("/removeCart", removeCart);

module.exports = router;
