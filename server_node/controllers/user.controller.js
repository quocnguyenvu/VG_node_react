const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Response = require('../helpers/response.helper');
const remove_Id = require('../utils/remove_Id');
const constant = require('../constants/index');
const sendEmail = require('../utils/sendEmail');

const User = require('../models/User');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Bill = require('../models/bill');
const BillDetail = require('../models/billDetail');
const Token = require('../models/Token');

const uploadImage = require('../utils/uploadImage');
const { protect } = require('../middlewares/admin/auth');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');

// Find Users
exports.getAll = async (req, res, next) => {
  let {
    query: { _limit, _page, q },
    admin,
  } = req;

  try {
    if (!admin) throw new Error(failMessage);

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let total = await User.find({ _id: { $ne: admin._id } }).count();
    let users = await User.find(
      { _id: { $ne: admin._id } },
      {
        password: 0,
      }
    );

    if (q) {
      users = users.filter((item) => {
        const index = item._doc.fullName.toLowerCase().indexOf(q.toLowerCase());
        return index > -1;
      });
      total = users.length;
    }

    return Response.success(res, {
      users: remove_Id(users.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit)),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);
    const user = await User.findById(userId, {
      firstName: 1,
      lastName: 1,
      fullName: 1,
      phoneNumber: 1,
      address: 1,
      birthday: 1,
      avatar: 1,
      gender: 1,
      email: 1,
      role: 1,
    });
    if (!user) throw new Error(failMessage);
    user._doc.id = user._id;

    return Response.success(res, { user });
  } catch (error) {
    return next(error);
  }
};

// Update User Information
exports.update = async (req, res, next) => {
  let {
    file,
    body: { firstName, lastName, address, birthday, gender, email },
    user,
  } = req;
  try {
    if (
      !user
      // !firstName &&
      // !lastName
      // phoneNumber &&
      // address &&
      // birthday &&
      // !(gender === "true" || gender === "false")
    )
      throw new Error(failMessage);

    let obj = {
      // firstName,
      // lastName,
    };

    let currentFirstName = '';
    if (firstName) {
      obj = { ...obj, firstName, fullName: `${firstName} ${user.lastName}` };
      currentFirstName = firstName;
    }
    if (lastName)
      obj = {
        ...obj,
        lastName,
        fullName: `${currentFirstName || user.firstName} ${lastName}`,
      };

    // if (phoneNumber) obj = { ...obj, phoneNumber };
    if (email) {
      const currentUser = await User.findOne({ email });
      if (currentUser) throw new Error('Email ???? c?? ng?????i s??? d???ng');
      obj = { ...obj, email };
    }
    if (address) obj = { ...obj, address };
    if (birthday) obj = { ...obj, birthday: new Date(birthday) };
    if (gender === 'true' || gender === 'false') obj = { ...obj, gender: gender === 'true' };

    if (file) {
      const result = await uploadImage(file);
      obj = { ...obj, avatar: result.url };
    }

    await User.findByIdAndUpdate(user._id, { ...obj });
    user = await User.findById(user._id, { password: 0 });
    user._doc.id = user._id;

    return Response.success(res, { message: updateSuccessMessage, user });
  } catch (error) {
    return next(error);
  }
};

// Update Password - Send Code To Gmail
exports.updatePassword = async (req, res, next) => {
  const {
    body: { password, newPassword },
    user,
  } = req;
  try {
    if (!user || !password || !newPassword) throw new Error(failMessage);

    if (!user.email) throw new Error('B???n c???n ph???i c?? email ????? x??c nh???n thay ?????i m???t kh???u');

    await Token.findOneAndDelete({ userId: user._id });

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error('B???n nh???p sai m???t kh???u');

    const salt = await bcrypt.genSalt(10);
    const generatedPass = await bcrypt.hash(newPassword, salt);

    // T???o 1 token -> l??u l???i -> g???i email + token -> email g???i l???i token h???p l??? -> verified user
    // Ng??y h???t h???n -> 24h
    const token = crypto.randomBytes(16).toString('hex');
    await Token.create({
      userId: user._id,
      newPassword: generatedPass,
      token,
      tokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send email
    const tokenUrl = `<a href="${req.protocol}://${req.get(
      'host'
    )}/api/user/auth/confirmation/${token}">${req.protocol}://${req.get(
      'host'
    )}/api/user/auth/confirmation/${token}</a>`;

    const message = `<p>Hello ${user.fullName},</p><p>B???n c???n truy c???p v??o link sau ????? x??c nh???n thay ?????i m???t kh???u:</p><p>${tokenUrl}</p>`;
    await sendEmail({
      email: user.email,
      subject: 'Change Password Token',
      message,
    });

    return Response.success(res, {
      message: 'Vui l??ng check mail ????? x??c nh???n thay ?????i m???t kh???u',
    });
  } catch (error) {
    return next(error);
  }
};

exports.updatePasswordConfirm = async (req, res, next) => {
  const {
    params: { token },
  } = req;

  try {
    if (!token) throw new Error(failMessage);

    const currentToken = await Token.findOne({ token });
    if (!currentToken || Date.now() > currentToken.tokenExpire) throw new Error(failMessage);

    const user = await User.findByIdAndUpdate(currentToken.userId, {
      password: currentToken.newPassword,
    });
    if (!user) throw new Error(failMessage);
    user._doc.id = user._id;

    await Token.findByIdAndDelete(currentToken._id);
    // return Response.success(res, { user, message: updateSuccessMessage });
    // Send email
    const tokenUrl = `<p>B???n ???? ?????i m???t kh???u th??nh c??ng, vui l??ng b???m v??o <a href="http://localhost:3000">????y</a> ????? quay l???i trang ch???</p>`;
    return res.send(tokenUrl);
  } catch (error) {
    return next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  const {
    params: { userId },
    body: { status, role },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);

    let user = await User.findById(userId);
    if (!user) throw new Error(failMessage);

    if (status && (status === 'blocked' || status === 'activated')) {
      if (user.status && user.status === status)
        throw new Error('B???n ??ang c???p nh???t l???i tr???ng th??i hi???n t???i');
      else await User.findByIdAndUpdate(userId, { status });
    }

    if (role && (role === 'admin' || role === 'user')) {
      if (user.role && user.role === role) throw new Error('B???n ??ang c???p nh???t l???i quy???n hi???n t???i');
      else await User.findByIdAndUpdate(userId, { role });
    }

    user = await User.findById(userId, { password: 0 });
    user._doc.id = user._id;

    return Response.success(res, { message: updateSuccessMessage, user });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);
    const user = await User.findById(userId);
    if (!user) throw new Error(failMessage);

    // X??a t???t c??? li??n quan t???i User trong CSDL

    // - Gi??? h??ng - Chi ti???t gi??? h??ng
    const cart = await Cart.findOne({ userId: user._id });
    if (cart) {
      const cartDetails = await CartDetail.find({ cartId: cart._id });
      for (let cartDetail of cartDetails) await CartDetail.findByIdAndDelete(cartDetail._id);
      await Cart.findByIdAndDelete(cart._id);
    }

    // - H??a ????n - Chi ti???t h??a ????n
    const bills = await Bill.find({ userId: user._id });
    if (bills) {
      for (let bill of bills) {
        const billDetails = await BillDetail.find({ billId: bill._id });
        for (let billDetail of billDetails) await BillDetail.findByIdAndDelete(billDetail._id);
        await Bill.findByIdAndDelete(bill._id);
      }
    }

    // - B??nh Lu???n - ????nh gi??

    // - M?? gi???m gi??

    await User.findByIdAndDelete(userId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
