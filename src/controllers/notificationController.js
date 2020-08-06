const Notification = require("../models/Notification");

module.exports = {
  createNotification: async (req, res) => {
    try {
      const not = await Notification.create(req.body);
      return res.status(200).send("YES");
    } catch (error) {
      return res.status(400).send({ error: true, message: error });
    }
  },

  getNotification: async (req, res) => {
    try {
      const nots = await Notification.find();
      return res.status(200).send(nots);
    } catch (error) {
      return res.status(400).send({ error: true, message: error });
    }
  },
};
