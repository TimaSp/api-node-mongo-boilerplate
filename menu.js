const {
  MenuTemplate,
  MenuMiddleware,
  createBackMainMenuButtons,
} = require("telegraf-inline-menu");
const md5 = require("md5");
const menu = new MenuTemplate(
  (ctx) => `Привет, ${ctx.from.first_name}!

 💰💰💰💰Мы команда Quantum Forex, мы поможем тебе заработать вместе с нами!💰💰💰💰`
);

const tarifsMenu = new MenuTemplate(`
Этот бот является приватным инвайтером команды Quantum Forex.
Оплата подписки производится автоматически. Выберите Ваш тариф 👇.

Вам будет выставлен счет, эквивалентный стоимости подписки на канал в долларах.

💳 1 неделя - 15$
💳 1 месяц - 50$
💳 3 месяца - 100$`);
const ID = () => "_" + Math.random().toString(36).substr(2, 9);
const paymentsMenu = new MenuTemplate("Оплата");

paymentsMenu.interact("Генерация ссылки оплаты", "unique", {
  do: async (ctx) => {
    const amount = ctx.match[1].split(" ");
    const merchantId = "220514";
    const orderId = ID();
    const secretWord = "qu044679";

    paymentsMenu.url(
      `💰${Number(amount[0])} USD`,
      `https://www.free-kassa.ru/merchant/cash.php?m=${merchantId}&oa=${
        amount[0]
      }&o=${orderId}&s=${md5(
        `${merchantId}:${amount[0]}:${secretWord}:${orderId}`
      )}&lang=ru&us_id=${ctx.from.id}&us_username=${ctx.from.username}`
    );
    return ".";
  },
});

let mainMenuToggle = false;

paymentsMenu.manualRow(createBackMainMenuButtons());

tarifsMenu.chooseIntoSubmenu(
  "payment",
  ["0.7 USD", "50 USD", "100 USD"],
  paymentsMenu
);

tarifsMenu.manualRow(createBackMainMenuButtons());
menu.submenu("Тарифы", "food", tarifsMenu, {
  hide: () => mainMenuToggle,
});
const menuMiddleware = new MenuMiddleware("/", menu);

module.exports = menuMiddleware;
