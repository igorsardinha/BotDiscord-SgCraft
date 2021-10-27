const Discord = require('discord.js')
const config = require('./config.json')
let embedTicketOpenned = new Discord.MessageEmbed()
.setTitle("SgCraft Network | Ticket")
.setDescription("Olá, por gentileza aguarde para ser atendido, adiante resumindo qual o seu problema ou dúvida.")
.setTimestamp().setFooter('Clique no ❌ para encerrar o atendimento.')




const json = {
    ticketOpen: embedTicketOpenned
}

module.exports = json