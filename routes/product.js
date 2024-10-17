const express = require("express");
const router = express.Router();
const productService = require("../src/controller/productController");
const { createResponse } = require("../src/helper/createResponse.helper");


router.post("/api/add", async (req, res) => {
    try {
        const { name, price, categoryId, description, quantity, image } = req.body;
        const newProduct = await productService.insert(name, price, categoryId, description, quantity, image);
        
        return res.json(createResponse(200, "Thêm sản phẩm thành công", "success", newProduct));
    } catch (error) {
        console.error("Lỗi thêm sản phẩm:", error);
        return res.json(createResponse(500, "Lỗi máy chủ", "error"));
    }
});


router.post("/api/category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const products = await productService.getCategoryId(categoryId);
        
        return res.json(createResponse(200, "Lấy danh mục thành công", "success", products)); 
    } catch (error) {
        console.log(error);
        return res.json(createResponse(500, "Lỗi máy chủ", "error"));
    }
});

router.get("/api/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.json(createResponse(409, "Sản phẩm không tồn tại", "error"));
        }

        return res.json(createResponse(200, "Lấy sản phẩm thành công", "success", product)); 
    } catch (error) {
        console.log(error);
        return res.json(createResponse(500, "Lỗi máy chủ", "error"));
    }
});


router.get("/api/getall", async (req, res) => {
    try {
        const products = await productService.getAll();
        return res.status(200).json(createResponse(200, "Lấy tất cả sản phẩm thành công", "success", products));
    } catch (error) {
        console.log(error);
        return res.json(createResponse(500, "Lỗi máy chủ", "error"));
    }
});

module.exports = router;
