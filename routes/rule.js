const express = require("express");
const router = express.Router();

const { getData, postValidationRule } = require("../controllers/rule");

router.route("/").get(getData)
router.route("/validate-rule").post(postValidationRule)

module.exports = router;