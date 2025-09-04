const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({
  path: './config.env'
});

function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "DARK-NOVA-XMDeyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEd1Uk4rQVFzL0hBTCtSMDV0ZDc4UFNWcDNpZ3g5aDZveVJ1N3V2OXczYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFMzbGc0eDIvMG96Tzk0N05SMWpaTUM4bjdma2lNNks0emVHT3FCcW1qWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRRjhRUnk5V3FyaHZUTUYyT21HdnFzU1pZemk5TGRYLzBzcjUrZEdHL0ZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWa2hCNS9kR2V2U0lwOXhuRHptM2w1OUxuWEFGbDkwUG9CUHN1TENIazFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIVFc3VHFLSjNvalBUTzJQbmwxaVNPZU5wR3RhQ3AvbllaZmdlNHVBRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1QN3NZYy9NV3RsTnZqSE14V0NlN3ViZy9OT3dzYmRucEtKdjBwTFh4RUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUtVU3pscHgyUkxmV2ZIcjVRMktYUVFubmZWV3Z4YU9pdndONjVxOS9HUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEpUMnBRUXB1bVZ4UkJWcENkRS9HSmFrTG8zSnZnOExIVkV3NCtjWlNBdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdXYWkxRmRmODhQUzcxdHpyQmFVUktQMTVBUlRXMkJ0a1VDQUR3T3ZzZ001TjRBMnA5SDMrL2F3U25kS25wZHpQQVM5S2lESjJ0UHVJQUZxYW1kNUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiI0d1piWXdKQkxJdUx4ZHFzRnhFWWtiSzdqWmU0eWZ2OWhqQy9XYm9BVTF3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJMVjlZUDY0TiIsIm1lIjp7ImlkIjoiOTQ3NzAzNDk4Njc6NzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQWxwaGF4IiwibGlkIjoiMjY0Mjk1NzQ1MDY1MTU4Ojc4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFdWMlk4SEVOV2c1c1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3VYRE13b2hPR25GQkNwMVJBZ3Y5T3ZOZjFMM09WZVdQQkNydnBwZmtpOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSnZsL1N3SFBKNHF6S2RwaUg0dEJjSXhKWmluTEc5SGJvdE1jSXdUODlGQ1VnYmFZYVpxc0tlTzZkMk9GZ0F0aVpFSG1hSzUvc05sUit5Q0JrMkRqQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IkYyTHhwMnJZT0I3VEhML1Q2UHZpd1Zub1ZacnprWGxqTFBsdHJ6STU4bmpHWEpJb3IwbEFhbkxGZSszN1hwekFXZW5rZlNRcTJMUWZsOC8wcThpMENBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzAzNDk4Njc6NzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDdsd3pNS0lUaHB4UVFxZFVRSUwvVHJ6WDlTOXpsWGxqd1FxNzZhWDVJdiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2OTkxNTg3LCJsYXN0UHJvcEhhc2giOiIzUjlaMzkifQ==",
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
  GIT: process.env.GIT || "https://github.com/PODDAe/test",
  WORKTYPE: process.env.WORKTYPE || 'public'
};
