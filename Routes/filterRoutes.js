const { Router } = require("express");
const {
  findByCountry,
  findByLikes,
  findByPrice,
} = require("../Controllers/searchController");
const router = Router();

router.get("/country", findByCountry);
router.get("/likes", findByLikes);
router.get("/price", findByPrice);

module.exports = router;
