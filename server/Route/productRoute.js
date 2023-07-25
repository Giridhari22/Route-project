const {
  addProducts,
  getProducts,
  searchapi,
  postEditProduct,
  deleteProduct,
  getEditProduct
} = require("../controllers/productController");
const multer  = require('multer');
const router = require("express").Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


// uploading image
router.post("/addProducts", upload.single('image'),addProducts )

// for getting products
router.get("/getProducts/:userId", getProducts);


// for search api
router.get("/searchapi", searchapi);


// for delete products
router.delete("/deleteProduct/:id", deleteProduct);


// for update products
router.post('/edit/:id' ,upload.single('image'), postEditProduct)



module.exports = router;

module.exports = router;
