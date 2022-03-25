const { Router } = require("express");
const router = Router();

const { getOrders, buyOne, buyAll } = require("../Controllers/orderController");

router.get("/", getOrders);
router.get("/buyOne", buyOne);
router.get("/buyMany", buyAll);

module.exports = router;
