const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({
  path: './config.env'
});

function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "",
  STICKER_NAME: process.env.STICKER_NAME || "DARK-NOVA-XMD",
  PREFIX: process.env.PREFIX || ".",
  MODE: process.env.MODE || "public",
  ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE) || false,
  AUTO_VOICE: convertToBool(process.env.AUTO_VOICE) || false,
  AUTO_REPLY: convertToBool(process.env.AUTO_REPLY) || false,
  AUTO_STICKER: convertToBool(process.env.AUTO_STICKER) || false,
  ANTI_LINK: convertToBool(process.env.ANTI_LINK) || false,
  ANTI_LINK_KICK: convertToBool(process.env.ANTI_LINK_KICK) || false,
  AUTO_STATUS_SEEN: convertToBool(process.env.AUTO_STATUS_SEEN) || false,
  AUTO_STATUS_REACT: convertToBool(process.env.AUTO_STATUS_REACT) || false,
  AUTO_STATUS_REPLY: convertToBool(process.env.AUTO_STATUS_REPLY) || false,
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY DARK-NOVA-XMD 🖤*",
  OWNER_NAME: process.env.OWNER_NAME || "YOUR NAME",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94752978237",
  BOT_NAME: process.env.BOT_NAME || "DARK-NOVA-XMD",
  MENTION_REPLY: convertToBool(process.env.MENTION_REPLY) || false,
  MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR/blob/main/images/WhatsApp%20Image%202025-08-15%20at%2017.22.03_c520eb7b.jpg?raw=true",
  WELCOME_MSG: process.env.WELCOME_MSG || "Hii",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "bye",
  ANTI_DEL: convertToBool(process.env.ANTI_DEL) || false,
  AUTO_READ: convertToBool(process.env.AUTO_READ) || false,
  OWNER_REACT: convertToBool(process.env.OWNER_REACT) || false,
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING) || false,
  AUTO_TYPING: convertToBool(process.env.AUTO_TYPING) || false,
  AUTO_REACT: process.env.AUTO_REACT || "false",
  CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
  CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "🥲,😂,👍🏻,🙂,😔",
  ANTI_BAD: process.env.ANTI_BAD || "false",
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "log",
  ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
  WELCOME: process.env.WELCOME || "true",
  READ_MESSAGE: process.env.READ_MESSAGE || "false",
  DEV: process.env.DEV || "94752978237",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  GIT: process.env.GIT || "https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR",
  WORKTYPE: process.env.WORKTYPE || 'public'
};