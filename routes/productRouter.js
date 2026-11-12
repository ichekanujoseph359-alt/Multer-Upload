const router = require('express').Router()
const {addProduct, getAllProducts, getoneProduct, updateProduct,deleteProduct} = require('../controller/productController')
const upload = require('../middleware/multer')

router.post('/addProduct',upload.single('productImage'), addProduct)
router.get('/allProducts', getAllProducts)
router.get('/oneProduct/:id', getoneProduct)
router.patch('/update/:id',upload.single('productImage'), updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router