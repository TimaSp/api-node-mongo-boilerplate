const Notification = require("../models/Notification");
const { Telegraf } = require("telegraf");
const bot = new Telegraf("1395654541:AAHo57AlfP-5vi38-Bz4wzAjg2XpK5xUI2Q");

module.exports = {
  createNotification: async (req, res) => {
    try {
      console.log(req.body);
      const not = await Notification.create(req.body);
      bot.telegram.sendMessage(
        req.body.us_chatid,
        "https://t.me/joinchat/AAAAAEYhQ_adRfCR84G19Q"
      );
      bot.telegram.getChat(req.body.us_chatid);

      return res.status(200).send(req.body);
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
