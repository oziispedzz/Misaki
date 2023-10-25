require('./src/settings')
const {
  default: newWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore, 
  PHONENUMBER_MCC,
  jidNormalizedUser,
  delay,
  Browsers,
  getContentType, 
  downloadContentFromMessage,
  jidDecode,
} = require(`@whiskeysockets/baileys`)

const axios = require('axios');
const pino = require('pino');
const { fileURLToPath } = require("url");
const { Boom } = require('@hapi/boom');
const readline = require("readline");
const { parsePhoneNumber } = require("libphonenumber-js");
const NodeCache = require("node-cache");
const path = require("path");
const fs = require('fs');
const chalk = require('chalk');
const FileType = require("file-type");
const fetch = require("node-fetch");
const PhoneNumber = require("awesome-phonenumber");

const {
  smsg,
  getBuffer, 
  fetchJson, 
  TelegraPh 
} = require("./src/lib/simple");
const { 
  toAudio, 
  toPTT, 
  toVideo 
} = require("./src/lib/converter");
const { 
  color
} = require("./src/lib/color");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif,
} = require("./src/lib/exif");

function nocache(module, cb = () => {}) {
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

const _0x2b184=_0x56b0;(function(_0x33f8b3,_0x321fb3){const _0xc42bef=_0x56b0,_0x39dada=_0x33f8b3();while(!![]){try{const _0x1a5640=-parseInt(_0xc42bef(0xfe))/0x1+-parseInt(_0xc42bef(0x104))/0x2*(parseInt(_0xc42bef(0x100))/0x3)+-parseInt(_0xc42bef(0xfb))/0x4*(-parseInt(_0xc42bef(0x107))/0x5)+parseInt(_0xc42bef(0x106))/0x6*(-parseInt(_0xc42bef(0xf9))/0x7)+parseInt(_0xc42bef(0x103))/0x8*(parseInt(_0xc42bef(0x108))/0x9)+parseInt(_0xc42bef(0x102))/0xa+parseInt(_0xc42bef(0xfd))/0xb*(parseInt(_0xc42bef(0x10a))/0xc);if(_0x1a5640===_0x321fb3)break;else _0x39dada['push'](_0x39dada['shift']());}catch(_0x4e3150){_0x39dada['push'](_0x39dada['shift']());}}}(_0x16f1,0x878c0));let phoneNumber=global[_0x2b184(0x109)];function _0x16f1(){const _0x3a040d=['stdout','1453484DzxELQ','createInterface','84931uYXlDx','183106agkzRn','includes','3svxtrI','--mobile','9700810fzjjaf','17192uXpxgq','994964ccCqxX','silent','66wxxLwL','10mxXwAv','495uFlzuO','owner','564ZAGMPh','599529hSYMnU'];_0x16f1=function(){return _0x3a040d;};return _0x16f1();}function _0x56b0(_0x1ac5fe,_0x25e751){const _0x16f1fe=_0x16f1();return _0x56b0=function(_0x56b006,_0x483e66){_0x56b006=_0x56b006-0xf9;let _0x45af59=_0x16f1fe[_0x56b006];return _0x45af59;},_0x56b0(_0x1ac5fe,_0x25e751);}const pairingCode=!!phoneNumber||process['argv'][_0x2b184(0xff)]('--pairing-code'),useMobile=process['argv'][_0x2b184(0xff)](_0x2b184(0x101)),rl=readline[_0x2b184(0xfc)]({'input':process['stdin'],'output':process[_0x2b184(0xfa)]}),question=_0x144690=>new Promise(_0x3f4efc=>rl['question'](_0x144690,_0x3f4efc)),store=makeInMemoryStore({'logger':pino({'level':_0x2b184(0x105),'stream':'store'})});

async function Botstarted() {
  function _0x2659(_0x5c4fd0,_0x19d3e9){const _0x3ecb5d=_0x3ecb();return _0x2659=function(_0x26597e,_0x44c40a){_0x26597e=_0x26597e-0xca;let _0x1aac25=_0x3ecb5d[_0x26597e];return _0x1aac25;},_0x2659(_0x5c4fd0,_0x19d3e9);}function _0x3ecb(){const _0x151e92=['69220RINvBX','keys','Chrome\x20(Linux)','fatal','remoteJid','261TAEDcZ','355761AfkKKS','29520kwRHfO','loadMessage','creds','7iCuScu','471094WJyUzA','silent','5DOxOdn','300696csDTDQ','457892LlbiJx','2713296SaAneI'];_0x3ecb=function(){return _0x151e92;};return _0x3ecb();}const _0x26dc62=_0x2659;(function(_0x3470b1,_0x21ed85){const _0x1e5c87=_0x2659,_0x18126c=_0x3470b1();while(!![]){try{const _0x99f734=-parseInt(_0x1e5c87(0xd3))/0x1+-parseInt(_0x1e5c87(0xd0))/0x2+parseInt(_0x1e5c87(0xcb))/0x3+parseInt(_0x1e5c87(0xd4))/0x4*(parseInt(_0x1e5c87(0xd2))/0x5)+parseInt(_0x1e5c87(0xd5))/0x6*(parseInt(_0x1e5c87(0xcf))/0x7)+parseInt(_0x1e5c87(0xcc))/0x8*(parseInt(_0x1e5c87(0xca))/0x9)+-parseInt(_0x1e5c87(0xd6))/0xa;if(_0x99f734===_0x21ed85)break;else _0x18126c['push'](_0x18126c['shift']());}catch(_0xb0c7c){_0x18126c['push'](_0x18126c['shift']());}}}(_0x3ecb,0x3cd21));const {version,isLatest}=await fetchLatestBaileysVersion(),{state,saveCreds}=await useMultiFileAuthState('./src/database/session'),msgRetryCounterCache=new NodeCache(),conn=newWASocket({'logger':pino({'level':_0x26dc62(0xd1)}),'printQRInTerminal':!pairingCode,'mobile':useMobile,'browser':[_0x26dc62(0xd8),'',''],'auth':{'creds':state[_0x26dc62(0xce)],'keys':makeCacheableSignalKeyStore(state[_0x26dc62(0xd7)],pino({'level':_0x26dc62(0xd9)})['child']({'level':'fatal'}))},'markOnlineOnConnect':!![],'generateHighQualityLinkPreview':!![],'getMessage':async _0x4c1793=>{const _0x53fd7b=_0x26dc62;let _0x2468f3=jidNormalizedUser(_0x4c1793[_0x53fd7b(0xda)]),_0x2ab886=await store[_0x53fd7b(0xcd)](_0x2468f3,_0x4c1793['id']);return _0x2ab886?.['message']||'';},'msgRetryCounterCache':msgRetryCounterCache,'defaultQueryTimeoutMs':undefined});
 
  store.bind(conn.ev);
  
  require("./src/misaki");
  nocache("./src/misaki", (module) => console.log(` "${module}" Telah diupdate!`));
  nocache("./src/settings", (module) =>
    console.log(` "${module}" Telah diupdate!`)
  );
  
const _0x48ee22=_0x5a58;function _0x5a58(_0x445362,_0xa18056){const _0x1f3edc=_0x1f3e();return _0x5a58=function(_0x5a5830,_0x1b378f){_0x5a5830=_0x5a5830-0x19c;let _0x27245c=_0x1f3edc[_0x5a5830];return _0x27245c;},_0x5a58(_0x445362,_0xa18056);}(function(_0xb8430c,_0x2986c3){const _0x5cdc78=_0x5a58,_0x58eb7d=_0xb8430c();while(!![]){try{const _0x1d58fc=parseInt(_0x5cdc78(0x1b8))/0x1+-parseInt(_0x5cdc78(0x1a1))/0x2+-parseInt(_0x5cdc78(0x1b9))/0x3*(-parseInt(_0x5cdc78(0x1b1))/0x4)+parseInt(_0x5cdc78(0x19f))/0x5*(parseInt(_0x5cdc78(0x1ae))/0x6)+-parseInt(_0x5cdc78(0x1af))/0x7+parseInt(_0x5cdc78(0x1a8))/0x8+parseInt(_0x5cdc78(0x1ac))/0x9*(-parseInt(_0x5cdc78(0x1ad))/0xa);if(_0x1d58fc===_0x2986c3)break;else _0x58eb7d['push'](_0x58eb7d['shift']());}catch(_0x3d4c1c){_0x58eb7d['push'](_0x58eb7d['shift']());}}}(_0x1f3e,0xf35de));if(pairingCode&&!conn[_0x48ee22(0x1b0)][_0x48ee22(0x19d)][_0x48ee22(0x1b4)]){if(useMobile)throw new Error(_0x48ee22(0x1a0));let phoneNumber;!!phoneNumber?(phoneNumber=phoneNumber[_0x48ee22(0x1a5)](/[^0-9]/g,''),!Object[_0x48ee22(0x1a7)](PHONENUMBER_MCC)[_0x48ee22(0x1ab)](_0xdc3e13=>phoneNumber[_0x48ee22(0x1a6)](_0xdc3e13))&&(console['log'](chalk[_0x48ee22(0x1b3)](chalk[_0x48ee22(0x1b7)](_0x48ee22(0x1b2)))),process[_0x48ee22(0x1aa)](0x0))):(phoneNumber=await question(chalk[_0x48ee22(0x1b3)](chalk[_0x48ee22(0x1a2)](_0x48ee22(0x1a3)))),phoneNumber=phoneNumber[_0x48ee22(0x1a5)](/[^0-9]/g,''),!Object['keys'](PHONENUMBER_MCC)[_0x48ee22(0x1ab)](_0x2897b4=>phoneNumber[_0x48ee22(0x1a6)](_0x2897b4))&&(console[_0x48ee22(0x1ba)](chalk[_0x48ee22(0x1b3)](chalk[_0x48ee22(0x1b7)](_0x48ee22(0x1b2)))),phoneNumber=await question(chalk[_0x48ee22(0x1b3)](chalk['greenBright'](_0x48ee22(0x19e)))),phoneNumber=phoneNumber[_0x48ee22(0x1a5)](/[^0-9]/g,''),rl['close']())),setTimeout(async()=>{const _0x2ab596=_0x48ee22;let _0x28b1de=await conn['requestPairingCode'](phoneNumber);_0x28b1de=_0x28b1de?.[_0x2ab596(0x1a9)](/.{1,4}/g)?.[_0x2ab596(0x1b6)]('-')||_0x28b1de,console[_0x2ab596(0x1ba)](chalk[_0x2ab596(0x19c)](chalk[_0x2ab596(0x1a4)](_0x2ab596(0x1b5))),chalk[_0x2ab596(0x19c)](chalk['white'](_0x28b1de)));},0xbb8);}function _0x1f3e(){const _0xe02c5d=['keys','12690608VfVlQJ','match','exit','some','9zQJfbL','10947490UdtElX','186fXSaAU','1496698QepYez','authState','1815820vACyKK','Start\x20with\x20country\x20code\x20of\x20your\x20WhatsApp\x20Number,\x20example:\x20+628xxxx','bgBlack','registered','Your\x20Pairing\x20Code\x20:\x20','join','redBright','1140713qVsgAU','3PcAqfp','log','black','creds','Please\x20type\x20your\x20WhatsApp\x20number\x20\x0aFor\x20example:\x20+628xxxx\x20:\x20','93085pZWRYw','Cannot\x20use\x20pairing\x20code\x20with\x20mobile\x20api','2905456aAUabm','greenBright','Please\x20type\x20your\x20WhatsApp\x20number\x20\x0aFor\x20example:\x20+628xxxx:\x20','bgGreen','replace','startsWith'];_0x1f3e=function(){return _0xe02c5d;};return _0x1f3e();}
  
  conn.ev.on("messages.upsert", async (chatUpdate) => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
      //mek = chatUpdate.messages[0]
      for (let mek of chatUpdate.messages) {
        if (!mek.message) return;
        const m = smsg(conn, mek, store);
        const isCreator = [
          "6289528652225@s.whatsapp.net",
          "6289528652225@s.whatsapp.net",
          ...global.owner,
        ]
          .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
          .includes(m.sender);
        mek.message =
          Object.keys(mek.message)[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;
        if (mek.key && mek.key.remoteJid === "status@broadcast") return;
        if (
          !conn.public &&
          !isCreator &&
          !mek.key.fromMe &&
          chatUpdate.type === "notify"
        )
          return;
        if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
        require("./src/misaki")(conn, m, chatUpdate, mek, store);
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  conn.ev.on('group-participants.update', async (anu) => {
    console.log(anu)
      try {
        let metadata = await conn.groupMetadata(anu.id);
        let participants = anu.participants;
          for (let num of participants) {
          let nameUser = await conn.getName(num)
          let membr = metadata.participants.length 
            if ( anu.action === 'add' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `Hello @${num.split("@")[0]} Welcome To *${metadata.subject}*` })
            } else if ( anu.action === 'remove' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `Goodbye @${num.split("@")[0]} I Hope You Don't Come Back` }) 
            } else if ( anu.action === 'promote' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `@${num.split("@")[0]} Congratulations, Now you are a Group Admin` })
            } else if ( anu.action === 'demote' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `@${num.split("@")[0]} Hahaha You are in demote` })
            }
          }
      } catch (err) {
      console.log(`ERROR DIBAGIAN ` + err)
    }
  });
  
    // Setting
  conn.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  conn.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = conn.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = {
          id,
          name: contact.notify,
        };
    }
  });

  conn.getName = (jid, withoutContact = false) => {
    id = conn.decodeJid(jid);
    withoutContact = conn.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === conn.decodeJid(conn.user.id)
          ? conn.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  conn.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await conn.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await conn.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      });
    }
    conn.sendMessage(
      jid,
      {
        contacts: {
          displayName: `${list.length} Kontak`,
          contacts: list,
        },
        ...opts,
      },
      {
        quoted,
      }
    );
  };

  conn.public = true;

  conn.serializeM = (m) => smsg(conn, m, store);
  
  conn.ev.on("connection.update", async (update) => {
  const { connection } = update;
    if(connection === 'close') {
        console.log('Connection Closed: Reconnecting...');
        await Botstarted();
      } else if(connection === 'open') {
        console.log('Connected!');
        const creds = fs.readFileSync('./src/database/session/creds.json');
        await delay(1000 * 2) 
        const replied = await conn.sendMessage(conn.user.id, { document: creds, mimetype: `application/json`, fileName: `creds.json` })
        await conn.sendMessage(conn.user.id, { text: `Ini adalah file Sesi anda, Jangan bagikan file ini dengan siapa pun.` }, { quoted: replied });
      }
  });
  
  conn.ev.on("creds.update", saveCreds);
  
  conn.sendText = (jid, text, quoted = "", options) =>
    conn.sendMessage(
      jid,
      {
        text: text,
        ...options,
      },
      {
        quoted,
        ...options,
      }
    );

  conn.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };

  conn.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;

    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
  conn.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    conn.sendMessage(
      jid,
      {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        ),
        ...options,
      },
      {
        quoted,
      }
    );
  conn.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
      ? Buffer.from(PATH.split`,`[1], "base64")
      : /^https?:\/\//.test(PATH)
      ? await (res = await fetch(PATH)).buffer()
      : fs.existsSync(PATH)
      ? ((filename = PATH), fs.readFileSync(PATH))
      : typeof PATH === "string"
      ? PATH
      : Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    const type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && returnAsFilename && !filename)
      (filename = path.join(
        __dirname,
        "./src/media/" + new Date() * 1 + "." + type.ext
      )),
        await fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      ...type,
      data,
      deleteFile() {
        return filename && fs.promises.unlink(filename);
      },
    };
  };

  conn.sendFile = async (
    jid,
    path,
    filename = "",
    caption = "",
    quoted,
    ptt = false,
    options = {}
  ) => {
    let type = await conn.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;
    if ((res && res.status !== 200) || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString()),
        };
      } catch (e) {
        if (e.json) throw e.json;
      }
    }
    let opt = {
      filename,
    };
    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;
    let mtype = "",
      mimetype = type.mime,
      convert;
    if (
      /webp/.test(type.mime) ||
      (/image/.test(type.mime) && options.asSticker)
    )
      mtype = "sticker";
    else if (
      /image/.test(type.mime) ||
      (/webp/.test(type.mime) && options.asImage)
    )
      mtype = "image";
    else if (/video/.test(type.mime)) mtype = "video";
    else if (/audio/.test(type.mime))
      (convert = await (ptt ? toPTT : toAudio)(file, type.ext)),
        (file = convert.data),
        (pathFile = convert.filename),
        (mtype = "audio"),
        (mimetype = "audio/ogg; codecs=opus");
    else mtype = "document";
    if (options.asDocument) mtype = "document";

    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;

    let message = {
      ...options,
      caption,
      ptt,
      [mtype]: {
        url: pathFile,
      },
      mimetype,
    };
    let m;
    try {
      m = await conn.sendMessage(jid, message, {
        ...opt,
        ...options,
      });
    } catch (e) {
      //console.error(e)
      m = null;
    } finally {
      if (!m)
        m = await conn.sendMessage(
          jid,
          {
            ...message,
            [mtype]: file,
          },
          {
            ...opt,
            ...options,
          }
        );
      file = null;
      return m;
    }
  };
  conn.sendMedia = async (jid, path, filename, quoted = "", options = {}) => {
    let { ext, mime, data } = await conn.getFile(path);
    messageType = mime.split("/")[0];
    pase = messageType.replace("application", "document") || messageType;
    return await conn.sendMessage(
      jid,
      {
        [`${pase}`]: data,
        mimetype: mime,
        fileName: filename + ext ? filename + ext : getRandom(ext),
        ...options,
      },
      {
        quoted,
      }
    );
  };
  conn.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
    let { ext, mime, data } = await conn.getFile(path);
    let media = {};
    let buffer;
    media.data = data;
    media.mimetype = mime;
    if (options && (options.packname || options.author)) {
      buffer = await writeExif(media, options);
    } else {
      buffer = /image/.test(mime)
        ? await imageToWebp(data)
        : /video/.test(mime)
        ? await videoToWebp(data)
        : "";
    }
    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await (await fetch(path)).buffer()
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }

    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };

  conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }

    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  conn.sendButtonText = (
    jid,
    buttons = [],
    text,
    footer,
    quoted = "",
    options = {}
  ) => {
    let buttonMessage = {
      text,
      footer,
      buttons,
      headerType: 2,
      ...options,
    };
    conn.sendMessage(jid, buttonMessage, {
      quoted,
      ...options,
    });
  };
  conn.send1ButMes = (
    jid,
    text = "",
    footer = "",
    butId = "",
    dispText = "",
    quoted,
    ments
  ) => {
    let but = [
      {
        buttonId: butId,
        buttonText: {
          displayText: dispText,
        },
        type: 1,
      },
    ];
    let butMes = {
      text: text,
      buttons: but,
      footer: footer,
      mentions: ments ? ments : [],
    };
    conn.sendMessage(jid, butMes, {
      quoted: quoted,
    });
  };

  conn.sendButImage = async (
    jid,
    link,
    but = [],
    text = "",
    footer = "",
    ments = [],
    quoted
  ) => {
    let dlimage;
    try {
      dlimage = await getBuffer(link);
    } catch {
      dlimage = await getBuffer(
        "https://telegra.ph/file/ca0234ea67c9a8b8af9a1.jpg"
      );
    }
    const buttonMessage = {
      image: dlimage,
      caption: text,
      footer: footer,
      buttons: but,
      headerType: "IMAGE",
      mentions: ments,
    };

    conn.sendMessage(jid, buttonMessage, quoted);
  };
  conn.sendFakeLink = (jid, text, salam, pushname, quoted) =>
    conn.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          externalAdReply: {
            title: `Selamat ${salam} ${pushname}`,
            body: footer_text,
            previewType: "PHOTO",
            thumbnail: pp_bot,
            sourceUrl: myweb,
          },
        },
      },
      {
        quoted,
      }
    );

  return conn;
}

Botstarted()
 