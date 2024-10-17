const express = require("express");
const router = express.Router();
const {
  register,
  login,
} = require("../src/controller/usercontroller");
const { createResponse } = require('../src/helper/createResponse.helper');

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await register(fullName, email, password);
    if (existingUser) {
        return res.status(201).json(createResponse(201, "Đăng kí thành công", "success", existingUser));
    } else {
        return res.status(400).json(createResponse(400, "Người dùng đã tồn tại", "error"));
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký người dùng:", error);
    return res.status(500).json(createResponse(500, "Lỗi đăng kí", "error", error.message));
  }
});

router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user) {
        return res.status(200).json(createResponse(200, "Đăng nhập thành công", "success", user));
    } else {
      return res.status(401).json(createResponse(401, "Email hoặc mật khẩu không đúng", "error"));
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return res.status(500).json(createResponse(500, "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.", "error"));
  }
});

module.exports = router;
