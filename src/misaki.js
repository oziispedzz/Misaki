/**
  * Created by FauziDevID
  * Contact me on WhatsApp wa.me/6289528652225 
  * Subscribe me on Youtube : https://youtube.com/@fauzijayawardana

SCRIPT ORI BUATAN FAUZII!!
*/
require('../src/settings')
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} = require("@whiskeysockets/baileys");
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const axios = require('axios');
const moment = require('moment-timezone');
const ms = toMs = require('ms');
const FormData = require("form-data");
const similarity = require("similarity");
const threshold = 0.72;
const path = require("path");
const os = require("os");
const nou = require("node-os-utils");
const fetch = require("node-fetch")
const youtube = require("yt-search");
const cheerio = require('cheerio')

const {
    smsg,
    fetchJson,
    getBuffer,
    getRandom,
    getGroupAdmins,
    TelegraPh,
    msToDate,
    isUrl,
    sleep,
    hitungmundur,
    checkBandwidth,
    runtime
} = require('../src/lib/simple')
const uploadImage = require('../src/lib/uploadImage')
const { menu } = require('../src/help')

let mess = JSON.parse(fs.readFileSync('./src/mess.json'));
let { wait, error, mgroup, mprivate, admin, botadmin, owner, prem, done } = mess;

let toxic = JSON.parse(fs.readFileSync('./src/database/antitoxic.json'))

let bad = JSON.parse(fs.readFileSync('./src/database/bad.json'))

module.exports = conn = async (
    conn,
    m,
    chatUpdate,
    mek,
    store,
    antiToxic
) => {
    try {
        var body =
            m.mtype === "conversation" ?
            m.message.conversation :
            m.mtype == "imageMessage" ?
            m.message.imageMessage.caption :
            m.mtype == "videoMessage" ?
            m.message.videoMessage.caption :
            m.mtype == "extendedTextMessage" ?
            m.message.extendedTextMessage.text :
            m.mtype == "buttonsResponseMessage" ?
            m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype == "listResponseMessage" ?
            m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype == "templateButtonReplyMessage" ?
            m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "messageContextInfo" ?
            m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
            m.text :
            ""; //omzee
        var budy = typeof m.text == "string" ? m.text : "";
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body);
        const prefix = isCmd ? budy[0] : "";
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const text = (q = url = args.join(" "));
        const type = Object.keys(mek.message)[0];
        const pushname = m.pushName || "No Name";
        const botNumber = await conn.decodeJid(conn.user.id);
        const tanggal = moment().tz("Asia/jakarta").format("dddd, ll");
        const jam = moment(Date.now()).tz("Asia/jakarta").locale("id").format("HH:mm:ss z");
        const wita = moment(Date.now()).tz("Asia/makassar").locale("id").format("HH:mm:ss z");
        const salam = moment(Date.now()).tz("Asia/jakarta").locale("id").format("a");
        const isCreator = [botNumber, ...global.owner, '6289528652225@s.whatsapp.net'].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const quoted = m.quoted ? m.quoted : m;
        const from = m.chat;
        const sender = m.sender;
        const mime = (quoted.msg || quoted).mimetype || "";
        const isMedia = /image|video|sticker|audio/.test(mime);
        const time = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");
        
        //group
        const isGroup = m.key.remoteJid.endsWith("@g.us");
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = m.isGroup ? await groupMetadata.participants : "";
        const groupMembers = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
        const antiToxic = m.isGroup ? toxic.includes(from) : false;
        
        const reply = (text) => {
            conn.sendFakeLink(m.chat, text, salam, pushname)
        }
        
        // Public & Self
       if (!conn.public) {
         if (!m.key.fromMe && !isCreator) return
       }
       
       if (/^a(s|ss)alamu('|)alaikum$/.test(budy?.toLowerCase())) {
         const jawab = [
            'Wa\'alaikumusalam',
            'Wa\'alaikumusalam wb',
            'Wa\'alaikumusalam Warohmatulahi Wabarokatuh',
         ]
         const salam = jawab[Math.floor(Math.random() * jawab.length)]
         return reply(salam)
       }
        
       if (m.message) {
         conn.readMessages([m.key]);
           console.log(
             chalk.black(chalk.greenBright("[ DATE ]")),
             chalk.black(chalk.bgGreen(new Date())) + "\n" +
             chalk.black(chalk.greenBright("[ MESSAGE ]")),
             chalk.black(chalk.bgBlue(budy || m.mtype)) +
             "\n" +
             chalk.magenta("=> From"),
             chalk.green(pushname),
             chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
             chalk.green(m.isGroup ? pushname : "Chat Pribadi", m.chat)
            );
       }
       
       if (antiToxic)
       if (bad.includes(command)) {
       if (m.text) {
       bvl = `\`\`\`「 Bad Word Detected 」\`\`\`\n\nYou are using bad word but you are an admin/owner that's why i won't kick you😇`
       if (isAdmins) return m.reply(bvl)
       if (m.key.fromMe) return m.reply(bvl)
       if (isCreator) return m.reply(bvl)
       await conn.sendMessage(m.chat,
       {
       delete: {
       remoteJid: m.chat,
       fromMe: false,
       id: m.key.id,
       participant: m.key.participant
       }
       })
       await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
       conn.sendMessage(from, {text:`\`\`\`「 Bad Word Detected 」\`\`\`\n\n@${m.sender.split("@")[0]} was kicked because of using bad words in this group`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})}
        }
       
       //FAKE
       const ftoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast" } : {})}, message: { "productMessage": { "product": { "productImage":{ "mimetype": "image/jpeg", "jpegThumbnail": pp_bot},"title": footer_text, "description": `${namabot}`, "currencyCode": "IDR", "priceAmount1000": "1000000000000000000", "retailerId": footer_text, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}} 
       const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': footer_text, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ytname,;;;\nFN:ytname\nitem1.TEL;waid=6289512545999:6289512545999\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_bot, thumbnail: pp_bot,sendEphemeral: true}}} 
        
       switch (command) {
        
       case 'owner':
       case 'creator': {
       conn.sendContact(m.chat, global.owner, m)}
       break
        
       case 'help':
       case 'menu': {
       conn.sendMessage(from, { text: menu( tanggal, jam, runtime, prefix, pushname ) }, { quoted: fkontak })
       }
       break
       
       case 'menu2': {
       var mnn = fs.readFileSync('./src/media/misaki.mp4')
       conn.sendMessage(m.chat, { video: mnn, caption: menu( tanggal, jam, runtime, prefix, pushname ), gifPlayback: true }, { quoted: m })
       }
       break
        
        //owner
       case 'public': {
       if (!m.key.fromMe && !isCreator) return reply(mess.owner)
       conn.public = true
       reply(`Successfully move to public mode`)
       }
       break
       
       case 'self': {
       if (!m.key.fromMe && !isCreator) return reply(mess.owner)
       conn.public = false
       reply(`Successfully move to self mode`)
       }
       break
       
       case 'bcgc': 
       case 'bcgroup': {
       if (!isCreator) return reply(mess.owner)
       if (!text) throw `Which text?\n\nExample : ${prefix + command} FauziGanteng`
       let getGroups = await conn.groupFetchAllParticipating()
       let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
       let anu = groups.map(v => v.id)
       m.reply(`Send Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} seconds`)
       for (let i of anu) {
       await sleep(1500)
       conn.sendMessage(i, {text: `${text}`}, {quoted: fkontak})
       }
       m.reply(`Successfully send broadcast to ${anu.length} group`)
       }
       break 
       
       case 'addbadword':{
       if (!isCreator) return reply(mess.owner)
       if (args.length < 1) return reply('Whats the word?')
       if (bad.includes(q)) return reply("The word is already in use")
       bad.push(q)
       fs.writeFileSync('./src/database/bad.json', JSON.stringify(bad))
       reply(`Success Adding Bad Word\nCheck by typing ${prefix}listbadword`)
       }
       break
       
       case 'delbadword':{
       if (!bad) return reply(mess.owner)
       if (args.length < 1) return reply('Enter the word')
       if (!bad.includes(q)) return reply("The word does not exist in the database")
       let wanu = bad.indexOf(q)
       bad.splice(wanu, 1)
       fs.writeFileSync('./src/database/bad.json', JSON.stringify(bad))
       reply(`Success deleting bad word ${q}`)
       }
       break
       
       case 'listbadword':{
       let teks = '「 *BadWord List* 」\n\n'
       for (let x of bad) {
       teks += `• ${x}\n`
       }
       teks += `\n*Totally there are : ${bad.length}*`
       reply(teks)
       }
       break
       
       //CHATGPT
       case "nino": {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Luffy&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'miku': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Miku&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'paimon': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Paimon&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'klee': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Klee&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'erza': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Erza&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'luffy': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Luffy&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break
        
        case 'robin': {
        if (!text) return m.reply('apa yang ingin kamu tanyakan kepada saya?')
        let afi = await fetch(`https://api-kazedevid.vercel.app/ai/charaai?chara=Robin&text=${text}`)
        let hsl = await afi.json()
        try {
        await m.reply(hsl.message)
        } catch (err ) {
        m.reply(util.format(hsl))
        }
        }
        break 
       
       //group
       case 'group':
       case 'grup': {
       if (!m.isGroup) return m.reply(mgroup)
       if (!isAdmins && !isCreator) return m.reply(mess.admin)
       if (!isBotAdmins) return m.reply(botadmin)
       if (args[0] === 'close') {
       await conn.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`successfully closed the group`)).catch((err) => reply(err))
       } else if (args[0] === 'open') {
       await conn.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`successfully opened the group`)).catch((err) => reply(err))
       } else {
       reply(`Example:\n${prefix + command} close`)
       }
       }
       break
       
       case 'kick': {
       if (!m.isGroup) return reply(mgroup)
       if (!isBotAdmins) return reply(botadmin)
       if (!isAdmins) return reply(mess.admin)
       let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
       await conn.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(mess.done)).catch((err) => reply('error'))
       }
       break
       
	   case 'add': {
	   if (!m.isGroup) return reply(mgroup)
       if (!isBotAdmins) return reply(botadmin)
       if (!isAdmins) return reply(mess.admin)
	   let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
       await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(mess.done)).catch((err) => reply("erorr"))
       }
       break
	   
	   case 'promote': {
	   if (!m.isGroup) return reply(mgroup)
       if (!isBotAdmins) return reply(botadmin)
       if (!isAdmins) return reply(mess.admin)
	   let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
		await conn.groupParticipantsUpdate(m.chat, users, 'promote').then((res) => m.reply(`Successfully`)).catch((err) => m.reply(err))
	   }
	   break
	   
	   case 'demote': {
	   if (!m.isGroup) return reply(mgroup)
       if (!isBotAdmins) return reply(botadmin)
       if (!isAdmins) return reply(mess.admin)
		let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
		await conn.groupParticipantsUpdate(m.chat, users, 'demote').then((res) => m.reply(`Successfully`)).catch((err) => m.reply(err))
	   }
	   break 
	   
	   case "revoke": {
       if (!m.isGroup) return reply(mess.mgroup);
       if (!isCreator) return reply(mess.owner);
       if (isBotAdmins) return reply(botadmin);
       if (!isAdmins && !isCreator) return reply(mess.admin);
       try {
       let link = await conn.groupRevokeInvite(from);
       await reply("dahhh" +
       `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`
       );
       } catch (err) {
       reply(botadmin)
       }
       }
       break;
       
       case "h":
       case "hidetag": {
       if (!m.isGroup) return reply(mess.mgroup);
       if (!isAdmins && !isCreator) return reply(mess.admin);
       let tek = m.quoted ? quoted.text : text ? text : "";
       conn.sendMessage(
       m.chat, {
       text: tek,
       mentions: participants.map((a) => a.id),
       }, {quoted: ftoko}
       );
       }
       break;
       
       case "tagall":
       case "infoall": {
       if (!m.isGroup) return reply(mess.mgroup);
       if (!isAdmins && !isCreator)
       return reply(mess.admin);
       let tekss = `*Mention All*\n\n• *Message : ${
       q ? q : "empty"
       }*\n\n`;
       for (let mem of participants) {
       tekss += `@${mem.id.split("@")[0]}\n`;
       }
       tekss += `\n*${namabot}*`;
       conn.sendMessage(m.chat, { text: tekss, mentions: participants.map((a) => a.id), }, { quoted: fkontak }
       );
       }
       break;

       case 'totag': {
       if (!m.isGroup) return reply(mess.mgroup)
       if (!isBotAdmins) return reply(mess.botadmin)
       if (!isAdmins) return reply(mess.admin)
       if (!m.quoted) return `Reply message with caption ${prefix + command}`
       conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id)})
       }
       break
       
       case 'getlink':
       case 'linkgroup':
       case 'linkgrup':
       case 'linkgc': {
       if (!m.isGroup) return reply(mess.mgroup)
       if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
       if (!isBotAdmins) return reply(mess.botadmin)
       let response = await conn.groupInviteCode(m.chat)
       conn.sendText(m.chat, `*INFO LINK GROUP*\n*Name :* ${groupMetadata.subject}\n*Owner Grup :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Tidak diketahui'}\n*ID :* ${groupMetadata.id}\n*Link Chat :* https://chat.whatsapp.com/${response}\n*Member :* ${groupMetadata.participants.length}\n`, ftoko,  {
       detectLink: true
       })
       }
       break 
       
       case 'close':
       case 'closetime': {
       if (!m.isGroup) return reply(mess.mgroup)
       if (!isAdmins && !isCreator) return reply(mess.admin)
       if (!isBotAdmins) return reply(mess.botadmin)
       if (args[1] == 'second') {
       var timer = args[0] * `1000`
       } else if (args[1] == 'minute') {
       var timer = args[0] * `60000`
       } else if (args[1] == 'hour') {
       var timer = args[0] * `3600000`
       } else if (args[1] == 'day') {
       var timer = args[0] * `86400000`
       } else {
       return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
       }
       reply(`Close Time ${q} Starting from now`)
       setTimeout(() => {
       var nomor = m.participant
       const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
       conn.groupSettingUpdate(from, 'announcement')
       reply(close)
       }, timer)
       }
       break
       
       case 'open':
       case 'opentime': {
       if (!m.isGroup) return reply(mess.mgroup)
       if (!isAdmins && !isCreator) return reply(mess.admin)
       if (!isBotAdmins) return reply(mess.botadmin)
       if (args[1] == 'second') {
       var timer = args[0] * `1000`
       } else if (args[1] == 'minute') {
       var timer = args[0] * `60000`
       } else if (args[1] == 'hour') {
       var timer = args[0] * `3600000`
       } else if (args[1] == 'day') {
       var timer = args[0] * `86400000`
       } else {
       return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
       }
       reply(`Open time ${q} Startting from now`)
       setTimeout(() => {
       var nomor = m.participant
       const open = `*On time* Group Open By Admin\nNow all participants can send messages` 
       conn.groupSettingUpdate(from, 'not_announcement')
       reply(open)
       }, timer)
       }
       break
       
       case 'antitoxic': {
       if (!m.isGroup) return reply(mess.mgroup)
       if (!isBotAdmins) return reply(mess.botadmin)
       if (!isAdmins && !isCreator) return reply(mess.admin)
       if (args[0] === "on") {
       if (antiToxic) return reply('Already activated')
       toxic.push(from)
       fs.writeFileSync('./src/database/antitoxic.json', JSON.stringify(toxic))
       reply('Success in turning on antitoxic in this group')
       var groupe = await conn.groupMetadata(from)
       var members = groupe['participants']
       var mems = []
       members.map(async adm => {
       mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
       })
       conn.sendMessage(from, {text: `\`\`\`「 ⚠️Warning⚠️ 」\`\`\`\n\nNobody is allowed to use bad words in this group, one who uses will be kicked immediately!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
       } else if (args[0] === "off") {
       if (!antiToxic) return reply('Already deactivated')
       let off = toxic.indexOf(from)
       toxic.splice(off, 1)
       fs.writeFileSync('./src/database/antitoxic.json', JSON.stringify(toxic))
       reply('Success in turning off antitoxic in this group')
       } else {
       await reply(`Please Type The Option\n\nExample: ${prefix + command} on\nExample: ${prefix + command} off\n\non to enable\noff to disable`)
       }
       }
       break
       
       //TOOLS
       case 'lirik':
	   case 'liriklagu': {
	   const fg = require('api-dylux')
       let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
       if (!teks) return reply(`Want to Find What Song Lyrics?`)
       reply(mess.wait)
       try {
       let res = await fg.lyrics(text);
       let mes = `
• *${res.title}*
• *${res.artist}*      
${res.lyrics}`;
       conn.sendFile(m.chat, res.thumb, 'img.png', mes, m);
       } catch (e) {
       reply(mess.lv)
       } 
       }
       break
       
       case "s":
       case "sticker":
       case 'stiker':
       case 'swm':
       case 'take':
       case 'wm': {
       if (!quoted) return reply('mana?')
       if (quoted.isAnimated) {
       let media = await conn.downloadAndSaveMediaMessage(quoted)
       let webpToMp4 = await webp2mp4File(media)
       let encmedia = await conn.sendVideoAsSticker(m.chat, webpToMp4.result, m, {
       packname: text.split('|')[0] ? text.split('|')[0] : pushname,
       author: text.split('|')[1] ? text.split('|')[1] : ''
       })
       await fs.unlinkSync(encmedia)
       } else if (/image/.test(mime)) {
       let media = await quoted.download()
       let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
       packname: text.split('|')[0] ? text.split('|')[0] : pushname,
       author: text.split('|')[1] ? text.split('|')[1] : ''
       })
       await fs.unlinkSync(encmedia)
       } else if (/video/.test(mime)) {
       if ((quoted.msg || quoted).seconds > 11) return reply(lang.NoToStik(prefix, command))
       let media = await quoted.download()
       let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
       packname: text.split('|')[0] ? text.split('|')[0] : pushname,
       author: text.split('|')[1] ? text.split('|')[1] : ''
       })
       await fs.unlinkSync(encmedia)
       } else {
       reply('Reply Photo Or Video You Want to Be Used as a Sticker')
       }
       }
       break
       
       case 'smeme': {
	   let respond = `Send/reply image/sticker with caption ${prefix + command} text1|text2`
	   if (!/image/.test(mime)) return m.reply(respond)
       if (!text) return m.reply(respond)
       m.reply(mess.wait)
       atas = text.split('|')[0] ? text.split('|')[0] : '-'
       bawah = text.split('|')[1] ? text.split('|')[1] : '-'
	   let dwnld = await conn.downloadAndSaveMediaMessage(quoted)
	   let connCans = await TelegraPh(dwnld)
	   let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${connCans}`
	   let Fauzi = await conn.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.auhor })
	   await fs.unlinkSync(Fauzi)
       }
	   break
	  
       case 'qc': {
       const { quote } = require('../src/lib/quote.js')
       if (!q) return reply('Enter text')
       let ppnyauser = await conn.profilePictureUrl(m.sender, 'image').catch(_=> 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
       const rest = await quote(q, pushname, ppnyauser)
       reply(mess.wait)
       await conn.sendImageAsSticker(m.chat, rest.result, m, { packname: `${global.packname}`, author: `${global.author}`})
       }
       break
            
       case 'qcimg': {
       const { quote } = require('../src/lib/quote.js')
       if (!q) return reply('Text Input')
       let ppnyauser = await conn.profilePictureUrl(m.sender, 'image').catch(_=> 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
       const rest = await quote(q, pushname, ppnyauser)
       reply(mess.wait)
       //conn.sendMessage(m.chat, { image: { url: rest.result }, caption: `Done?`}, {quoted: m})
       await conn.sendFile(m.chat, rest.result, 'img.jpg', `Don't forget to donate to support me`, ftoko)
       }
       break
	   
	   //DOWNLOADER
	   case 'play':
       if (!text) throw 'Enter Title / Link From YouTube!';
       reply(mess.wait) 
       try {
       var search = await youtube(text);
       var convert = search.videos[0];
       if (!convert) throw 'Video/Audio not found';
       if (convert.seconds >= 3600) {
       return reply('Video is longer than 1 hour!');
       } else {
       var audioUrl
       try {
       audioUrl = `https://aemt.me/downloadAudio?URL=${convert.url}&videoName=ytdl`
       } catch (e) {
       audioUrl = `https://yt.tioo.eu.org/youtube?url=${convert.url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
       }
       var build = await fetch(convert.image)
       var buffer = await build.buffer()
       var image = await uploadImage(buffer)
       var caption = `∘ Title : ${convert.title}\n∘ Ext : Search\n∘ ID : ${convert.videoId}\n∘ Duration : ${convert.timestamp}\n∘ Viewers : ${convert.views}\n∘ Upload At : ${convert.ago}\n∘ Author : ${convert.author.name}\n∘ Channel : ${convert.author.url}\n∘ Url : ${convert.url}\n∘ Description : ${convert.description}\n∘ Thumbnail: ${image}`;
       var pesan = conn.relayMessage(m.chat, { extendedTextMessage:{ text: caption, contextInfo: { externalAdReply: { title: "Powered by", mediaType: 1, previewType: 0, renderLargerThumbnail: true,thumbnailUrl: image, sourceUrl: `${convert.url}` }}, mentions: [m.sender]}}, {})
       conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', }, { quoted: fkontak });
       }
       } catch (e) {
       reply(`*Error:* ` + e);
       } 
       break
	   
	   case 'tiktoknowm':
       if (!url) return reply(`Kirim perintah ${command} link`)
       if (!q.includes('tiktok')) return reply(mess.error.Iv)
       reply(mess.wait)
       require('api-dylux').tiktok(q).then( data => {
       conn.sendMessage(from, { video: { url: data.hdplay }}, { quoted: msg })
       }).catch(() => reply(mess.error.api))
       break
       
       default:
       if ( isCmd) {
	   	  reply(`Command belum tersedia, coba beberapa hari kedepan yaa! _^`)
	   }
       if (budy.startsWith(">")) {
       if (!isCreator) return;
       try {
          let evaled = await eval(budy.slice(2));
             if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
                    await reply(evaled);
                } catch (err) {
                    await m.reply(util.format(err));
                }
            }
        }
    } catch (err) {
        m.reply(util.format(err))
    }
}

/**
  * Created by FauziDevID
  * Contact me on WhatsApp wa.me/6289528652225 
  * Subscribe me on Youtube : https://youtube.com/@fauzijayawardana

SCRIPT ORI BUATAN FAUZII!!
*/