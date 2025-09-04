const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({
  path: './config.env'
});

function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "DARK-NOVA-XMDeyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BvQnpTenNzKzBWNm5vUXBPOXl2RW0ycnQ1eTFVcExHZU05SmlyMTQzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1FMcTdqRWZyYkVWRHg0WG1qcmF5eUVuQklTQmtRMGdOVVVoTmRYRUgzWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQ1ZHRytwQXlGV1Zhd3ZMamxTRW5wNjdXd012dm5aRmRldGZXTE9nam5vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSanRta3BkQ0JKMUxDcmFrLytpdjVwa2dWLzZOUlppczVqdHp2cGNmQmxjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndFM2VzYnFSTEx5TmF1clhsMzhkR0FtRzJud25IajA0eVBPUzRUekR5a0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZYSjhvSEhjd0tkNkVSaURvRjRTZkxxRkJ3dTdTZTNZd0lEMDFLSUJHRDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkFQeHBBdEQ3QTNuTVBORkpKdE95dmRSY2xTUDhaeTJqRGJFQm9qdmlVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejdYRS9tSkRxNURCS2NtZ1RwWk9UZDJBaEFLeUFZd09TUmZXTnRRNnVsaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFjYWxUM1p1N0I1eGFaYzFueUVydGxhSWxOMFdWQ3RUdTU0b2pLTjMzZ093Tlc3ODdmaDJDNyt4ajZ5MGdEMnJvTUVIUWVEWU1XNXBKaW5zVzJQckNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiIxSkVQMjgzdisxaE44MEluajk4a2VTbGVFOGdkMFFPR3FnOVM5aThCMWs0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzUyOTc4MjM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk1MkY4QTdDRDhFQkVGQ0ZBMTg5NUJFOTlCMTIyREY5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTY4MTg1ODJ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzUyOTc4MjM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ5MkE3RTA2MkUxRDc0Rjk3QkUxOTNCREE1QzdDN0JGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTY4MTg1ODJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pEem1Zc0NFSS9aMjhVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkhNbHpCcEF5SEpyekJteWFYTy9pdzg2OWhlZk5EOWRqWUM3NUIzY1VvQ009IiwiYWNjb3VudFNpZ25hdHVyZSI6IjA1MTJYd1I4dUJwU01Rbk5WT3QyZEpaWTgzbFlKUlZDYURHY0JSZHlFVGp3RTd0U1NYTm41Q0FCbW1icU1lVTUwYzBZSEhKQW95czRUaTBIYzh6cEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxdDc3Z0lzbDVseUdreFhTUFBZcDNaTzBRVlZrNjlkYjJZV1RPYWoydVl3WVkzZ1FkbUM2UkxmbE9PL2FiZUFuK0tqUTcyLzExN0VCNDZYTmh0OXZDUT09In0sIm1lIjp7ImlkIjoiOTQ3NTI5NzgyMzc6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJjYWtlcyIsImxpZCI6IjY0Nzk0NTE0MjEwODU0OjJAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzUyOTc4MjM3OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnpKY3dhUU1oeWE4d1pzbWx6djRzUE92WVhuelEvWFkyQXUrUWQzRktBaiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2ODE4NTc5LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU12cSJ9",
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
