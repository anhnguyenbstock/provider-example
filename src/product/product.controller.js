const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.getAll = async (req, res) => {
    res.send(await repository.fetchAll())
};

exports.repository = repository;