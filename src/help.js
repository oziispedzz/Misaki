const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

exports.menu = ( tanggal, jam, runtime, prefix, pushname ) => { return (
`Hi @${pushname}

• Date: ${tanggal}
• Time: ${jam}
• Runtime: ${runtime(process.uptime())}
`+ readmore +`
*CHATGPT*
• ${prefix}ai
• ${prefix}nino
• ${prefix}miku
• ${prefix}erza
• ${prefix}klee
• ${prefix}robin
• ${prefix}luffy
• ${prefix}paimon

*DOWNLOADER*
• ${prefix}play

*TOOLS*
• ${prefix}stiker
• ${prefix}smeme
• ${prefix}swm
• ${prefix}qc
• ${prefix}qcimg

*GROUP*
• ${prefix}antitoxic
• ${prefix}add 
• ${prefix}kick
• ${prefix}promote
• ${prefix}demote
• ${prefix}group
• ${prefix}opentime
• ${prefix}closetime
• ${prefix}revoke
• ${prefix}hidetag
• ${prefix}tagall
• ${prefix}totag
• ${prefix}getlink
• ${prefix}lirik

*OTHER*
• ${prefix}listbadword

*OWNER*
• ${prefix}self
• ${prefix}public
• ${prefix}bcgc
• ${prefix}addbadword
• ${prefix}delbadword
`
)
}