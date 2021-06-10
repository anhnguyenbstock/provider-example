const router = require('express').Router();
const controller = require('./product.controller');

router.get("/products", controller.getAll);
router.get("/product/:id", controller.getById);
router.get("/products/name", controller.getProductsName);

module.exports = router;