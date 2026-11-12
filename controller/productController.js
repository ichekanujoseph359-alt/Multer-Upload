const {Products} = require('../models')
const fs = require('fs')

exports.addProduct = async (req,res)=> {
  try {
   const {productName,price,stock} = req.body;

   const product = await Products.create({
    productName,
    price,
    stock,
    productImage: req.file.path
   })

   res.status(201).json({
    message: 'Product added successfully',
    data: product
   })
  } catch (err) {
    return res.status(500).json({
        message: err.message
    })
  }
}


exports.getAllProducts = async (req,res)=> {
    try {
        const products = await Products.findAll()

        res.status(200).json({
            message: 'Products found',
            data: products
        })
    } catch (err) {
        return res.status(500).json({
        message: err.message
    })
    }
}

exports.getoneProduct = async (req,res)=> {
    try {
        const {id} = req.params;
        const product = await Products.findByPk(id)
    
        if(!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            })
        }

        res.status(200).json({
            message: 'Product Found',
            data: product
    })
    } catch (err) {
        return res.status(500).json({
        message: err.message
    })
    }
}

exports.updateProduct = async (req,res)=> {
try {
        const {id} = req.params;
    const {productName,stock,price} = req.body;

    const product = await Products.findByPk(id)

    if(!product) {
        return res.status(404).json({
            message: 'Product Not Found'
        })
    }

    const data = {
        productName,
        stock,
        price
    }

    if(req.file){
        const oldFilePath = product.productImage
        fs.unlinkSync(oldFilePath)
        data.productImage = req.file.path
    }

    res.status(200).json({
        message: 'Product updated successfully',
        data: product
    })

    await product.update(data)
} catch (err) {
    return res.status(500).json({
        message: err.message
    })
}
}
exports.deleteProduct = async (req,res)=> {
  try {
        const {id} = req.params;
    const product = await Products.findByPk(id)

    if(!product) {
        return res.status(404).json({
            message: 'Product Not Found'
        })
    }

    if(product.productImage && fs.existsSync(product.productImage)) {
        const oldFilePath = product.productImage
        fs.unlinkSync(oldFilePath)
    }

    

    await product.destroy({where: {id}})
    return res.status(200).json({
        message: 'Product deleted successfully',
        data: product
    })
  }catch (err) {
        return res.status(500).json({
        message: err.message
    })
  }
}