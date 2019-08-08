const express = require("express");
const router = express.Router();
const loader = require("../loader.js");
const articleRouter = require("./blog/articleRouter");
const centenceRouter = require("./blog/centenceRouter");
const tagRouter = require("./blog/tagRouter");

articleRouter(router,loader);
centenceRouter(router,loader);
tagRouter(router,loader);

module.exports = router;