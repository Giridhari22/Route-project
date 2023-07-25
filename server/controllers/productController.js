const productModel = require("../Models/productModel");

const { Op } = require("sequelize");
const path = "http://localhost:4500";

exports.addProducts = async (req, res) => {
  try {
    const { UserId, productName, productPrice, category } = req.body;
    console.log(req.body);
    console.log(req.file);
    const image = req.file.filename;
    const seq = await productModel.create({
      UserId,
      productName,
      productPrice,
      category,
      image: `${path}/${req.file.path}`,
    });
    console.log(seq);
    if (seq) {
      return res.json({ success: true, seq });
    } else {
      return res.json({ success: false, msg: "file not uploaded" });
    }
  } catch (error) {
    return res.json(error);
  }
};
// jkljlkjl

exports.getProducts = async (req, res) => {
  try {
    const data = await productModel.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json({ data: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

exports.searchapi = async (req, res) => {
  try {
    const { productName, userId } = req.query;
    console.log(req.query);

    const results = await productModel.findAll({
      where: {
        userId: {
          [Op.like]: `%${req.query.userId}%`,
        },
        productName: {
          [Op.like]: `%${productName}%`,
        },
      },
    });
    return res.json({ success: true, products: results });
  } catch (error) {}
};

exports.deleteProduct = async (req, res) => {
  try {
    const data = await productModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ data: data });
    console.log(data);
  } catch (error) {
    return res.json({ error });
  }
};

exports.postEditProduct =  (req, res) => {
  console.log(req.body)
  const productID = req.params.id;
  console.log(productID)
  const image = req.file.filename;
  const product = {
    // id:req.params.ProductId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    category: req.body.category,
    image: `${path}/${req.file.path}`,
  };
  productModel
    .update(product, { where: { id: productID } })
    .then(() => {
      res.status(200).json({ msg: "product updated successfully" });
      // res.redirect("/products");
    })
    .catch((error) => {
      console.log("error");
    });
};


