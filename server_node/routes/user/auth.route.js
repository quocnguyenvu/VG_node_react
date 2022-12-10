const express = require('express');
const multer = require('multer');

const router = express.Router();

const { protect } = require('../../middlewares/user/auth');
const upload = multer({ dest: 'public/uploads/products' });

const { login, register, getMe } = require('../../controllers/user/auth.controller');
const {
  update,
  updatePassword,
  updatePasswordConfirm,
} = require('../../controllers/user.controller');

// @route   POST api/user/auth/login
// @desc    Đăng nhập
// @access  Public
router.post('/login', login);

// @route   POST api/user/auth/register
// @desc    Đăng ký
// @access  Public
router.post('/register', register);

// @route   GET api/user/auth/confirmPassword/:token
// @desc    Xác nhận cập nhật mật khẩu
// @access  Private
router.get('/confirmation/:token', updatePasswordConfirm);

router.use(protect);

// @route   GET api/user/auth
// @desc    Lấy thông tin chính chủ
// @access  Private
router.get('/', getMe);

// @route   PATCH api/user/auth
// @desc    Cập nhật thông tin người dùng
// @access  Private
router.patch('/', upload.single('avatar'), update);

// @route   PATCH api/user/auth/updatePassword
// @desc    Cập nhật mật khẩu
// @access  Private
router.patch('/updatePassword', updatePassword);

module.exports = router;
