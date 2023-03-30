const router = require("express").Router();
const { importdb, exportdb } = require("../controllers/db");

router.get("/import", importdb);
router.get("/export", exportdb);

module.exports = router;
