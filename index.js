require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { Telegraf } = require("telegraf");
const {
  MenuTemplate,
  MenuMiddleware,
  createBackMainMenuButtons,
} = require("telegraf-inline-menu");
const md5 = require("md5");
const app = express();

const mongoFun = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tima:tima123@cluster0.da64q.mongodb.net/quantum-bot?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Succsessfuly conected");
  } catch (error) {
    throw error;
  }
};
mongoFun();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Access-Control-Request-Method",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );

  next();
});

app.use("/api/v1/notifications", require("./src/routes/notifcations.js"));
// const ID = () => "_" + Math.random().toString(36).substr(2, 9);
const bot = new Telegraf("1395654541:AAHo57AlfP-5vi38-Bz4wzAjg2XpK5xUI2Q");

// const menuTemplate = new MenuTemplate(
//   (ctx) =>
//     `
//                         Привет, ${ctx.from.first_name}!

//   💰💰💰💰Мы команда Quantum Forex, мы поможем тебе заработать вместе с нами!💰💰💰💰`
// );

// const merchatId = "220514";
// const orderId = ID();
// const secretWord = "qu044679";
// const submenuTemplate = new MenuTemplate(`
// Этот бот является приватным инвайтером команды Quantum Forex. Оплата подписки производится автоматически. Выберите Ваш тариф 👇.

// Вам будет выставлен счет, эквивалентный стоимости подписки на канал в долларах.

// 💳 1 неделя - 15$
// 💳 1 месяц - 50$
// 💳 3 месяца - 100$
// `);

// submenuTemplate.url(
//   "💰$15 USD/ 1 Неделя",
//   `https://www.free-kassa.ru/merchant/cash.php?m=${merchatId}&oa=${0}&o=${orderId}&s=${md5(
//     `${merchatId}:${15}:${secretWord}:${orderId}`
//   )}&lang=ru`
// );
// submenuTemplate.url(
//   "💰$50 USD/ 1 Месяц ",
//   `https://www.free-kassa.ru/merchant/cash.php?m=${merchatId}&oa=${50}&o=${orderId}&s=${md5(
//     `${merchatId}:${50}:${secretWord}:${orderId}`
//   )}&lang=ru`,
//   {
//     joinLastRow: true,
//   }
// );
// submenuTemplate.url(
//   "💰$100 USD/ 3 Месяца",
//   `https://www.free-kassa.ru/merchant/cash.php?m=${merchatId}&oa=${100}&o=${orderId}&s=${md5(
//     `${merchatId}:${100}:${secretWord}:${orderId}`
//   )}&lang=ru`,
//   {
//     joinLastRow: true,
//   }
// );

// submenuTemplate.manualRow(createBackMainMenuButtons());

// menuTemplate.submenu("Тариф", "unique", submenuTemplate);

// const menuMiddleware = new MenuMiddleware("/", menuTemplate);
// bot.command("start", (ctx) => menuMiddleware.replyToContext(ctx));
// bot.use(menuMiddleware);
// bot.launch();

const menuMiddleware = require("./menu");

bot.start((ctx) => {
  menuMiddleware.replyToContext(ctx);
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.use(menuMiddleware);
bot.launch();

// app.use((req, res) => {
//   res.status(500).send({ error: true, message: "Something went wrong" });
// });
app.get("/", (req, res) => {
  res.status(200).send({ succeed: true, message: "Api is on fire" });
});

http.createServer({}, app).listen(process.env.PORT);
