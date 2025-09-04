const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  isJidBroadcast,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID,
  makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys')


const l = console.log
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require('./lib/functions')
const {
  AntiDelDB,
  initializeAntiDeleteSettings,
  setAnti,
  getAnti,
  getAllAntiDeleteSettings,
  saveContact,
  loadMessage,
  getName,
  getChatSummary,
  saveGroupMetadata,
  getGroupMetadata,
  saveMessageCount,
  getInactiveGroupMembers,
  getGroupMembersMessageCount,
  saveMessage
} = require('./data')
const fs = require('fs')
const ff = require('fluent-ffmpeg')
const P = require('pino')
const config = require('./config')
const GroupEvents = require('./lib/groupevents');
const qrcode = require('qrcode-terminal')
const StickersTypes = require('wa-sticker-formatter')
const util = require('util')
const {
  sms,
  downloadMediaMessage,
  AntiDelete
} = require('./lib')
const FileType = require('file-type');
const axios = require('axios')
const {
  File
} = require('megajs')
const {
  fromBuffer
} = require('file-type')
const bodyparser = require('body-parser')
const os = require('os')
const Crypto = require('crypto')
const path = require('path')
const prefix = config.PREFIX

const ownerNumber = [config.OWNER_NUMBER]

const tempDir = path.join(os.tmpdir(), 'cache-temp')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

const clearTempDir = () => {
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(tempDir, file), err => {
        if (err) throw err;
      });
    }
  });
}

// Clear the temp directory every 5 minutes
setInterval(clearTempDir, 5 * 60 * 1000);

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/sessions/creds.json')) {
  if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
  const sessdata = config.SESSION_ID.replace("DARK-NOVA-XMD", '');
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
  filer.download((err, data) => {
    if (err) throw err
    fs.writeFile(__dirname + '/sessions/creds.json', data, () => {
      console.log("Session downloaded ✅")
    })
  })
}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;

//=============================================

async function connectToWA() {
  console.log("Connecting to WhatsApp ⏳️...");
  const {
    state,
    saveCreds
  } = await useMultiFileAuthState(__dirname + '/sessions/')
  var {
    version
  } = await fetchLatestBaileysVersion()

  const conn = makeWASocket({
    logger: P({
      level: 'silent'
    }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  })

  conn.ev.on('connection.update', (update) => {
    const {
      connection,
      lastDisconnect
    } = update
    if (connection === 'close') {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA()
      }
    } else if (connection === 'open') {
      console.log('🧬 Installing Plugins')
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('Plugins installed successful ✅')
      console.log('DARK-NOVA-XMD CONNECTED SUCCESSFULLY ✅')

      let up = `*Hello there DARK-NOVA-XMD User! \ud83d\udc4b\ud83c\udffb* \n\n> Simple , Straight Forward But Loaded With Features \ud83c\udf8a, Meet DARK-NOVA-XMD WhatsApp Bot.\n\n *Thanks for using DARK-NOVA-XMD \ud83d\udea9* \n\n> Join WhatsApp Channel :- ⤵️\n \nhttps://chat.whatsapp.com/INURXi0iHQbE1mZn9l7t6r\n\n- *YOUR PREFIX:* = ${prefix}\n\n- *BOT MODE:* = ${config.MODE}\n\nDont forget to give star to repo ⬇️\n\nhttps://github.com/alpha-x-team-ofc\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ DARK-NOVA-XMD\ud83d\udda4`;
      conn.sendMessage(conn.user.id, {
        image: {
          url: `https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR/blob/main/images/WhatsApp%20Image%202025-08-15%20at%2017.22.03_c520eb7b.jpg?raw=true`
        },
        caption: up
      })
    }
  })
  conn.ev.on('creds.update', saveCreds)

  //==============================

  conn.ev.on('messages.update', async updates => {
    for (const update of updates) {
      if (update.update.message === null) {
        console.log("Delete Detected:", JSON.stringify(update, null, 2));
        await AntiDelete(conn, updates);
      }
    }
  });
  //============================== 

  conn.ev.on("group-participants.update", (update) => GroupEvents(conn, update));

  //=============readstatus=======

  conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0]
    if (!mek.message) return
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ?
      mek.message.ephemeralMessage.message :
      mek.message;
    //console.log("New Message Detected:", JSON.stringify(mek, null, 2));
    if (config.READ_MESSAGE === 'true') {
      await conn.readMessages([mek.key]); // Mark message as read
      console.log(`Marked message from ${mek.key.remoteJid} as read.`);
    }
    if (mek.message.viewOnceMessageV2)
      mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_SEEN === "true") {
      await conn.readMessages([mek.key])
    }
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true") {
      const jawadlike = await conn.decodeJid(conn.user.id);
      const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '💚'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      await conn.sendMessage(mek.key.remoteJid, {
        react: {
          text: randomEmoji,
          key: mek.key,
        }
      }, {
        statusJidList: [mek.key.participant, jawadlike]
      });
    }
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY === "true") {
      const user = mek.key.participant
      const text = `${config.AUTO_STATUS_MSG}`
      await conn.sendMessage(user, {
        text: text,
        react: {
          text: '💜',
          key: mek.key
        }
      }, {
        quoted: mek
      })
    }
    await Promise.all([
      saveMessage(mek),
    ]);
    const m = sms(conn, mek)
    const type = getContentType(mek.message)
    const content = JSON.stringify(mek.message)
    const from = mek.key.remoteJid
    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
    const isCmd = body.startsWith(prefix)
    var budy = typeof mek.text == 'string' ? mek.text : false;
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const text = args.join(' ')
    const isGroup = from.endsWith('@g.us')
    const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
    const senderNumber = sender.split('@')[0]
    const botNumber = conn.user.id.split(':')[0]
    const pushname = mek.pushName || 'Sin Nombre'
    const isMe = botNumber.includes(senderNumber)
    const isOwner = ownerNumber.includes(senderNumber) || isMe
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? await groupMetadata.participants : ''
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false
    const isReact = m.message.reactionMessage ? true : false
    const reply = (teks) => {
      conn.sendMessage(from, {
        text: teks
      }, {
        quoted: mek
      })
    }
    const udp = botNumber.split('@')[0];
    let isCreator = [udp, config.DEV, config.OWNER_NUMBER]
      .map(v => v.replace(/[^0-9]/g) + '@s.whatsapp.net')
      .includes(mek.sender);

    if (isCreator && mek.text.startsWith('%')) {
      let code = budy.slice(2);
      if (!code) {
        reply(
          `Provide me with a query to run Master!`,
        );
        return;
      }
      try {
        let resultTest = eval(code);
        if (typeof resultTest === 'object')
          reply(util.format(resultTest));
        else reply(util.format(resultTest));
      } catch (err) {
        reply(util.format(err));
      }
      return;
    }
    if (isCreator && mek.text.startsWith('$')) {
      let code = budy.slice(2);
      if (!code) {
        reply(
          `Provide me with a query to run Master!`,
        );
        return;
      }
      try {
        let resultTest = await eval(
          'const a = async()=>{\n' + code + '\n}\na()',
        );
        let h = util.format(resultTest);
        if (h === undefined) return console.log(h);
        else reply(h);
      } catch (err) {
        if (err === undefined)
          return console.log('error');
        else reply(util.format(err));
      }
      return;
    }
    //================ownerreact==============

    if (senderNumber.includes("5090000000") && !isReact) {
      const reactions = ["👑", "💀", "📊", "⚙️", "🧠", "🎯", "📈", "📝", "🏆", "🌍", "🇵🇰", "💗", "❤️", "💥", "🌼", "🏵️", , "💐", "🔥", "❄️", "🌝", "🌚", "🐥", "🧊"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
    }

    //==========public react============//

    // Auto React for all messages (public and owner)
    if (!isReact && config.AUTO_REACT === 'true') {
      const reactions = [
        '🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣',
        '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕',
        '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️',
        '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑',
        '💍', '👝', '💼', '🎒', '🥽', '🐻', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄',
        '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀',
        '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾',
        '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟',
        '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤',
        '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪',
        '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈',
        '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚',
        '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌',
        '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫',
        '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰'
      ];

      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
    }

    // custum react settings

    // Custom React for all messages (public and owner)
    if (!isReact && config.CUSTOM_REACT === 'true') {
      // Use custom emojis from the configuration (fallback to default if not set)
      const reactions = (config.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
    }

    //==========WORKTYPE============ 
    if (!isOwner && config.MODE === "private") return
    if (!isOwner && isGroup && config.MODE === "inbox") return
    if (!isOwner && !isGroup && config.MODE === "groups") return

    // take commands 

    const events = require('./command')
    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (isCmd) {
      const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
      if (cmd) {
        if (cmd.react) conn.sendMessage(from, {
          react: {
            text: cmd.react,
            key: mek.key
          }
        })

        try {
          cmd.function(conn, mek, m, {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            text,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            isCreator,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply
          });
        } catch (e) {
          console.error("[PLUGIN ERROR] " + e);
        }
      }
    }
    events.commands.map(async (command) => {
      if (body && command.on === "body") {
        command.function(conn, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          text,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          isCreator,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply
        })
      } else if (mek.q && command.on === "text") {
        command.function(conn, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          text,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          isCreator,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply
        })
      } else if ((command.on === "image" || command.on === "photo") && mek.type === "imageMessage") {
        command.function(conn, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          text,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          isCreator,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply
        })
      } else if (command.on === "sticker" && mek.type === "stickerMessage") {
        command.function(conn, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          text,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          isCreator,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply
        })
      }
    });
  });
  //===================================================
  conn.decodeJid = jid => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + '@' + decode.server) || jid
      );
    } else return jid;
  };
  //===================================================
  conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
      message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : message.message
      vtype = getContentType(message.message)
      if (vtype == 'viewOnceMessage') {
        message.message = message.message.viewOnceMessage.message
        message.message[getContentType(message.message)].viewOnce = false
      }
    }
    let mtype = getContentType(message.message)
    let m = generateWAMessageFromContent(jid, message.message, { ...options,
      messageId: message.key.id
    })
    if (forceForward) {
      m.message[mtype].contextInfo = {
        ...message.message[mtype].contextInfo,
        isForwarded: true,
        forwardingScore: 200
      }
    }
    m = generateWAMessageFromContent(jid, {
      ...message.message,
      ...m.message
    }, {
      ...options.opts,
      quoted: mek
    })
    await conn.relayMessage(jid, m.message, {
      messageId: m.key.id,
      additionalAttributes: {
        ...options
      }
    })
    return m
  }
  conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, {
        video: await getBuffer(url),
        caption: caption,
        gifPlayback: true,
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    let type = mime.split("/")[0] + "Message"
    if (type === "audioMessage") {
      return conn.sendMessage(jid, {
        audio: await getBuffer(url),
        caption: caption,
        mimetype: 'audio/mp4',
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    if (type === "imageMessage") {
      return conn.sendMessage(jid, {
        image: await getBuffer(url),
        caption: caption,
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    if (type === "videoMessage") {
      return conn.sendMessage(jid, {
        video: await getBuffer(url),
        caption: caption,
        mimetype: 'video/mp4',
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    if (type === "stickerMessage") {
      return conn.sendMessage(jid, {
        sticker: await getBuffer(url),
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    return conn.sendMessage(jid, {
      document: await getBuffer(url),
      mimetype: mime,
      caption: caption,
      ...options
    }, {
      quoted: quoted,
      ...options
    })
  }
  conn.sendContact = async (jid, numbers, name, quoted, opts) => {
    let list = []
    for (let i of numbers) {
      list.push({
        displayName: await conn.getName(i + '@s.whatsapp.net'),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      })
    }
    conn.sendMessage(jid, {
      contacts: {
        displayName: `${list.length} Contact`,
        contacts: list,
      },
      ...opts
    }, {
      quoted
    })
  }
  conn.sendContactUrl = async (jid, numbers, name, quoted, opts) => {
    let list = []
    for (let i of numbers) {
      list.push({
        displayName: await conn.getName(i),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      })
    }
    return await conn.sendMessage(jid, {
      contacts: {
        displayName: `${list.length} Contact`,
        contacts: list,
      },
      ...opts
    }, {
      quoted
    })
  }

  conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, {
    text: text,
    mentions: [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
    ...options
  }, {
    quoted
  })
  conn.sendPoll = async (jid, name = '', values = [], selectableCount = 1) => {
    return await conn.sendMessage(jid, {
      poll: {
        name,
        values,
        selectableCount
      }
    })
  }
  conn.getppuser = async (sender) => {
    return await conn.profilePictureUrl(sender, "image")
  }
  conn.getppgroup = async (gid) => {
    return await conn.profilePictureUrl(gid, "image")
  }
  conn.sendButton = async (jid, text, footer, button, quoted) => {
    const buttons = button.map(([display, id]) => ({
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({
        display_text: display,
        id: id
      })
    }));
    const message = {
      text,
      footer,
      templateButtons: buttons
    };
    return await conn.sendMessage(jid, message, {
      quoted: quoted
    });
  }
  conn.sendList = async (jid, title, text, button, options) => {
    const message = {
      text,
      footer: "",
      title,
      buttonText: button,
      sections: options
    };
    return await conn.sendMessage(jid, message);
  }
  conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    const file = await getBuffer(url)
    const mime = (await fileTypeFromBuffer(file)).mime
    const type = mime.split('/')[0]
    if (type === 'image') return conn.sendMessage(jid, {
      image: file,
      caption
    }, {
      quoted
    })
    if (type === 'video') return conn.sendMessage(jid, {
      video: file,
      caption,
      mimetype: 'video/mp4'
    }, {
      quoted
    })
    if (type === 'audio') return conn.sendMessage(jid, {
      audio: file,
      mimetype: 'audio/mp4'
    }, {
      quoted
    })
    return conn.sendMessage(jid, {
      document: file,
      mimetype: mime,
      caption
    }, {
      quoted
    })
  }
  conn.sendText = (jid, text, quoted) => conn.sendMessage(jid, {
    text
  }, {
    quoted
  })
  conn.sendImage = (jid, path, caption = '', quoted = '', options) => conn.sendMessage(jid, {
    image: path,
    caption,
    ...options
  }, {
    quoted
  })
  conn.sendVideo = (jid, path, caption = '', quoted = '', gif = false, options) => conn.sendMessage(jid, {
    video: path,
    caption,
    gifPlayback: gif,
    ...options
  }, {
    quoted
  })
  conn.sendAudio = (jid, path, quoted = '', ptt = false, options) => conn.sendMessage(jid, {
    audio: path,
    ptt: ptt,
    mimetype: 'audio/mpeg',
    ...options
  }, {
    quoted
  })
  conn.sendMedia = (jid, path, filename = '', caption = '', quoted = '', options = {}) => {
    let type = getMedia(path, options)
    let mimetype = is/image/test(type) ? 'image' : is/video/test(type) ? 'video' : is/audio/test(type) ? 'audio' : 'document'
    return conn.sendMessage(jid, {
      [mimetype]: path,
      caption,
      filename,
      ...options
    }, {
      quoted
    })
  }
  conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, ` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifWebp(buff, options)
    } else {
      buffer = await imageToWebp(buff)
    }
    await conn.sendMessage(jid, {
      sticker: {
        url: buffer
      },
      ...options
    }, {
      quoted
    })
    return buffer
  }
  conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `, ` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options)
    } else {
      buffer = await videoToWebp(buff)
    }
    await conn.sendMessage(jid, {
      sticker: {
        url: buffer
      },
      ...options
    }, {
      quoted
    })
    return buffer
  }
  conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/g, '') : mime.split('/')[0]
    if (quoted.mtype === 'viewOnceMessageV2') {
      messageType = quoted.message.viewOnceMessageV2.message.mtype.replace(/Message/g, '')
      mime = quoted.message.viewOnceMessageV2.message[messageType.toLowerCase()].mimetype || mime
    }
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }
    let ext
    if (attachExtension) {
      buffer = await fromBuffer(buffer);
      ext = buffer.ext;
    }
    let filepath = `${filename}.${ext}`
    await fs.promises.writeFile(filepath, buffer.buffer)
    return filepath
  }
  conn.getFile = async (PATH, save) => {
    let res
    let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`, ` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
    let type = await fromBuffer(data) || {
      mime: 'application/octet-stream',
      ext: '.bin'
    }
    if (data && save) fs.promises.writeFile(save, data)
    return {
      res,
      filename,
      ...type,
      data
    }
  }
  conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    let type = await conn.getFile(path, true)
    let {
      res,
      data: file,
      filename: fname
    } = type
    if (res && res.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        }
      } catch (e) {
        if (e.json) throw e.json
      }
    }
    let opt = {
      filename
    }
    if (quoted) opt.quoted = quoted
    if (!type) options.asDocument = true
    let mtype = ''
    if (/webp/.test(type.mime)) mtype = 'sticker'
    else if (/image/.test(type.mime)) mtype = 'image'
    else if (/video/.test(type.mime)) mtype = 'video'
    else if (/audio/.test(type.mime)) (options.ptt = ptt, mtype = 'audio')
    else mtype = 'document'
    return conn.sendMessage(jid, {
      ...options,
      [mtype]: file,
      caption,
      ...opt
    })
  }
  if (global.db) conn.loadDatabase = async () => {
    global.db.read()
    global.db.data = {
      users: {},
      chats: {},
      database: {},
      game: {},
      settings: {},
      others: {},
      sticker: {},
      ...(global.db.data || {})
    }
    global.db.chain = new Collection(global.db.data, global.db)
  }
  conn.getName = (jid, withoutContact = false) => {
    withoutContact = conn.withoutContact || withoutContact
    let v
    if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
      v = store.contacts[jid] || {}
      if (!(v.name || v.subject)) v = conn.groupMetadata(jid) || {}
      resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
    })
    else v = jid === '0@s.whatsapp.net' ? {
      jid,
      vname: 'WhatsApp'
    } : jid === conn.user.id ?
      conn.user :
      store.contacts[jid] || {}
    return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }
  conn.sendButton = async (jid, text, footer, button, q) => {
    const buttons = [
      ...button.map(btn => ({
        index: btn.index,
        quickReplyButton: {
          displayText: btn.display,
          id: btn.id
        }
      })),
    ];
    const buttonMessage = {
      text,
      footer,
      templateButtons: buttons,
      headerType: 1
    };
    return await conn.sendMessage(jid, buttonMessage, {
      quoted: q
    });
  };
  conn.sendContact = async (jid, list, quoted = '', opts = {}) => {
    let vcard = '';
    for (let i of list) {
      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${i.name}\nTEL;type=CELL;type=VOICE;waid=${i.number}:${i.number}\nEND:VCARD\n`;
    }
    await conn.sendMessage(
      jid, {
        contacts: {
          displayName: `${list.length} contact`,
          contacts: list.map(item => ({
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${item.name}\nitem1.TEL;waid=${item.number}:${item.number}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
          }))
        }
      }, {
        quoted,
        ...opts
      }
    );
  };
  //===========================================================
  conn.sendContactArray = async (jid, contacts, quoted = '', opts = {}) => {
    let list = []
    for (let i of contacts) {
      list.push({
        displayName: await conn.getName(i + '@s.whatsapp.net'),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${i};;;;\nFN:${i}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      })
    }
    conn.sendMessage(jid, {
      contacts: {
        displayName: `${list.length} Contact`,
        contacts: list,
      },
      ...opts
    }, {
      quoted
    })
  }

  conn.sendContactUrl = async (jid, name, url, quoted, opts) => {
    let list = []
    for (let i of url) {
      list.push({
        displayName: `${global.name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${global.name}\nFN:${global.name}\nitem1.TEL;waid=${global.number}:${global.number}\nitem1.X-ABLabel:Mobile\nitem2.EMAIL;type=INTERNET:${global.email}\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${global.github}/gotar-xmd\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
      })
    }
    conn.sendMessage(
      jid, {
        contacts: {
          displayName: `${list.length} Contact`,
          contacts: list,
        },
        ...opts,
      }, {
        quoted
      },
    );
  };

  // Status aka brio
  conn.setStatus = status => {
    conn.query({
      tag: 'iq',
      attrs: {
        to: '@s.whatsapp.net',
        type: 'set',
        xmlns: 'status',
      },
      content: [{
        tag: 'status',
        attrs: {},
        content: Buffer.from(status, 'utf-8'),
      }, ],
    });
    return status;
  };
  conn.serializeM = mek => sms(conn, mek, store);
}

app.get("/", (req, res) => {
  res.send("DARK-NOVA-XMD STARTED ✅");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
  connectToWA()
}, 4000);