const router = require("express").Router();
const { uploadFarmerProfile } = require("../controllers/farmers");

router.post("/profile", uploadFarmerProfile);

module.exports = router;
