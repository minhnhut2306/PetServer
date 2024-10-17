const express = require("express");
const ProductModel = require("./../modules/productmodule");


const getAll = async () => {
    try {
        const products = await ProductModel.find({});
        return products;
    } catch (error) {
        console.error("Lỗi", error);
        throw error;
    }
};

const getCategoryId = async (categoryId) => {
    try {
        const products = await ProductModel.find({ category: categoryId });
        return products;
    } catch (error) {
        console.log(error);
    }
};

const insert = async (name, price, categoryId, description, quantity, image) => {
    try {
        const product = new ProductModel({
            name,
            price,
            category: categoryId,
            description,
            quantity,
            image,
        });
        await product.save();
        return product;
    } catch (error) {
        console.error("Lỗi", error);
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const product = await ProductModel.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
module.exports = { getAll, getCategoryId, insert, getProductById };
