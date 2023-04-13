// loading modules
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const train = require("../models/trains")
const book = require("../models/book")
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

/*
method : POST
route : /api/user/
description: to create a user
*/
const createUser = async (req, res) => {
  const { name, email, password, is_admin, phone } = req.body;

  // validation
  if (!name || !email || !password || !phone)
    return res.status(200).json({
      msg: "enter all the fields",
    });

  // user already exist
  const duplicate = await user.findOne({
    email,
  });

  if (duplicate) return res.json({ msg: "user with same email already exist" });

  // default user
  if (is_admin == null) is_admin = false;

  // encrypting password
  const salt = uuidv4();
  const encry_password = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // creating user
  const newUser = new user({
    name,
    email,
    encry_password,
    salt,
    is_admin,
    phone,
  });

  await newUser
    .save()
    .then((user) => {
      res.status(200).json({
        email: user.email,
        name: user.name,
        is_admin: user.is_admin,
        id: user._id,
        phone: user.phone,
      });
    })
    .catch((err) => res.json({ err }));
};

/*
method: GET
route: /api/user/:id
description: get's a single user given the id
*/
const getUser = async (req, res) => {
  const { id } = req.params;

  // validation
  if (!id) return res.json({ msg: "id not found" });

  const foundUser = await user.findOne({
    _id: id,
  });

  // user not available
  if (!foundUser) return res.json({ msg: "User not Available" });

  // returns user
  return res.json({
    id: foundUser._id,
    email: foundUser.email,
    name: foundUser.name,
    phone: foundUser.phone,
    is_admin: foundUser.is_admin,
  });
};

/*
method: GET
route: /api/user/
description: get's all the users
*/
const getAllUsers = async (req, res) => {
  await user
    .find({})
    .then((users) => {
      return res.status(200).json({
        users,
      });
    })
    .catch((err) => res.json({ err }));
};

/*
method: DELETE
route: /api/user/
description: deletes a single user given the id
*/
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // validation
  if (!id) return res.json({ msg: "no id detected" });

  // deletion
  const delUser = await user.findOne({ _id: id });

  if (!delUser) return res.json({ msg: "User Does not exist" });

  delUser
    .deleteOne()
    .then((deletedUser) => {
      return res.json({
        id: deletedUser.id,
        name: deletedUser.name,
        email: deletedUser.email,
        phone: deletedUser.phone,
        is_admin: deletedUser.is_admin,
      });
    })
    .catch((err) => res.json({ err }));
};

/*
method: GET
route: /api/user/return
description: deletes a single user given the id
*/
const returnCurrentUser = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json({ msg: "Token Does not Exist" });

  try {
    var decoded = jwt.verify(token, process.env.TOKENKEY);
  } catch (err) {
    console.log(err);
  }
  const userExist = await user
    .findOne({ email: decoded.email })
    .catch((err) => console.log(err));

  if (!userExist) return res.json({ msg: "User Does not Exist" });

  return res.json({
    name: userExist.name,
    email: userExist.email,
    is_admin: userExist.is_admin,
    phone: userExist.phone,
    id: userExist._id,
  });
};


/*
method: GET
route: /api/user/changepass
description: deletes a single user given the id
*/
const changePassword = async (req, res) => {

  const { currPass, newPass } = req.body;
  const { token } = req.cookies;

  try {
    var decoded = jwt.verify(token, process.env.TOKENKEY);
  } catch (err) {
    console.log(err);
  }
  const userExist = await user
    .findOne({ email: decoded.email })
    .catch((err) => console.log(err))


  if (userExist.encry_password === crypto.createHmac("sha256", userExist.salt).update(currPass).digest("hex")) {
    const result = await user.updateOne({ email: userExist.email }, { encry_password: crypto.createHmac("sha256", userExist.salt).update(newPass).digest("hex") })
    if (result.nModified === 1) {
      res.status(200).send("Password Successfully Changed")
    }
  } else {
    res.status(400).send("Incorrect Current Password")
  }

};

/*
method: POST
route: /api/user/book
description: get's all the users
*/
const getAllBooking = async (req, res) => {

  const result = []

  const allBookings = await book.find({})

  for (const booking of allBookings) {
    const getUser = await user.find({ _id: booking.user })
    const getTrain = await train.find({ _id: booking.train })
    const data = {
      bookingId: booking._id,
      userDetails: getUser,
      trainDetails: getTrain,
    }
    result.push(data)
  }

  return res.status(200).send(result)
};

// exporting the modules
module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  returnCurrentUser,
  changePassword,
  getAllBooking,
};
