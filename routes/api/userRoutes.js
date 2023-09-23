const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
} = require("../../controllers/userController.js");
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser);
module.exports = router;
