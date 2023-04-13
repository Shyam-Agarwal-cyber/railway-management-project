const router = require("express").Router();
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  returnCurrentUser,
  changePassword,
  getAllBooking,
} = require("../controllers/user");
const { isAdmin, isAuthenticated } = require("../middlewares/auth");

router.post("/", createUser);
router.get("/book", isAdmin, getAllBooking);
router.get("/:id", isAuthenticated, getUser);
router.get("/", isAdmin, getAllUsers);
router.delete("/:id", isAuthenticated, deleteUser);
router.get("/return/current", isAuthenticated, returnCurrentUser);
router.post("/changepass", isAuthenticated, changePassword);

module.exports = router;
