const Sugestion = require("../../db/Models/SugestionSystem")
const Discord = require("discord.js")
module.exports.help = {
    'name': 'sugerir',
    'aliases': ['sugestao', 'sugestão']
}
exports.run = async (client, message, args) => {
    const findG = await Sugestion.findOne({where:{grupo: message.guild.id}})
    if(findG) {
        let sugestion = message.content.split(' ').slice(1).join(' ')
        if(!sugestion) return message.reply("Você deve inserir uma sugestão amiguinho :)")
        let embed = new Discord.MessageEmbed()
        .setTitle("Nova Sugestão de ", message.author.username)
        .addField("Sugeriu:", "```"+sugestion+"```")
		.addField("O que você acha dessa sugestão?")
        .setFooter(message.guild.name + " - © 2021").setColor("#00ffff").setTimestamp()
        .setColor("#00ffff")
client.channels.cache.get(findG.canal).send(embed).then(m => {
            m.react("👍")
            m.react("👎")
        })
    } else return message.reply("Comando desativado.")
}