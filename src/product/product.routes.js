const router = require('express').Router();
const controller = require('./product.controller');

router.get("/products", controller.getAll);

module.exports = router;