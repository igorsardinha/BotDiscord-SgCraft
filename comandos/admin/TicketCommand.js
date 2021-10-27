const Discord = require("discord.js")
const disbut = require("discord-buttons")
module.exports.help = {
    'name': 'ticket',
    'aliases': ['nticket']
}
const config = require("../../config.json")
exports.run = async (client, message, args) => {

    message.delete()

     let TicketEmbed = new Discord.MessageEmbed()
    .setDescription("Olá, você está na Central de Atendimento do SgCraft!\n\n**ESCOLHA A UMA CATEGORIA PARA ABRIR SEU TICKET:**\n"+ config.emojis.a + " **| " + config.ticket.types[0] + "**\n"+config.emojis.b+ " **| " + config.ticket.types[1] + "**\n"+config.emojis.c+" **| " + config.ticket.types[2] + "** \n\nNosso time vai lhe atender o mais rápido possível!")
    .setColor(`#800080`)
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter("SgCraft Network - Todos os direitos reservados.")

    let button1 = new disbut.MessageButton()
    .setID(config.ticket.types[0])
    .setStyle("red")
    .setLabel(config.ticket.types[0])

    let button2 = new disbut.MessageButton()
    .setID(config.ticket.types[1])
    .setStyle("green")
    .setLabel(config.ticket.types[1])

    let button3 = new disbut.MessageButton()
    .setID(config.ticket.types[2])
    .setStyle("blue")
    .setLabel(config.ticket.types[2])


    message.channel.send({
        buttons: [button1, button2, button3],
        embed: TicketEmbed
    })
}
