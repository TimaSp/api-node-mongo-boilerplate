const router = require("express-promise-router")();
const {
  createNotification,
  getNotification,
} = require("../controllers/notificationController");

console.log(createNotification);
router.route("/").post(createNotification);
router.route("/").get(getNotification);

module.exports = router;
