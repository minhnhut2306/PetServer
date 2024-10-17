const express = require('express');
const router = express.Router();
const orderController = require('../src/controller/orderController');
const { createResponse } = require('../src/helper/createResponse.helper');

router.post('/api/add', async (req, res) => {
  try {
    const savedOrder = await orderController.createOrder(req.body);
    return res.json(createResponse(200, "Thêm sản phẩm thành công", "success", savedOrder));
  } catch (error) {
    return res.json(createResponse(500, "Lỗi: Không thể thêm sản phẩm", "error", error.message));
  }
});

router.get('/api/getallorder', async (req, res) => {
  try {
    const orders = await orderController.getAllOrders();
    return res.json(createResponse(200, "Lấy danh sách sản phẩm thành công", "success", orders));
  } catch (error) {
    return res.json(createResponse(500, "Lỗi: Không thể lấy danh sách sản phẩm", "error", error.message));
  }
});


router.put('/api/update:id', async (req, res) => {
  try {
    const updatedOrder = await orderController.updateOrder(req.params.id, req.body);
    return res.json(createResponse(200, "Cập nhật sản phẩm thành công", "success", updatedOrder));
  } catch (error) {
    if (error.message === 'Order not found') {
      return res.json(createResponse(404, error.message, "error", null));
    }
    return res.json(createResponse(500, "Lỗi: Không thể cập nhật sản phẩm", "error", error.message));
  }
});

router.delete('/api/delete:id', async (req, res) => {
  try {
    const result = await orderController.deleteOrder(req.params.id);
    return res.json(createResponse(200, "Xóa sản phẩm thành công", "success", result.message));
  } catch (error) {
    if (error.message === 'Order not found') {
      return res.json(createResponse(404, error.message, "error", null));
    }
    return res.json(createResponse(500, "Lỗi: Không thể xóa sản phẩm", "error", error.message));
  }
});

module.exports = router;
