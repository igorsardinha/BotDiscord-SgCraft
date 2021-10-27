const Discord = require("discord.js")
const Money = require("../../db/Models/MoneyTable")
const disbut = require("discord-buttons")
module.exports = {
    help: {
        name: 'money',
        aliases: ["dinheiro"]
    },
    run: async (client, message, args) => {
        let findP = await Money.findOne({where: {
            grupo: message.guild.id,
            user: message.author.id
        }})
        if(!findP) {
            findP = await Money.create({
                grupo: message.guild.id,
                user: message.guild.id,
                carteira: 0.01,
                banco: 0.01,
                bancoPago: true
            })
        }
        let arg = args[0]
        let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(client.user.username + " | Economia")
        .addField("👛 Carteira", findP.carteira, true)
        .addField("💰 Banco", findP.banco, true)
        .addField("🏛 Banco Pago", findP.bancoPago.toString().replace("true", "Sim").replace("false", "Não"), true)

        if(findP.bancoPago === false) {
            embed.addField("Preço a pagar", "R$ 3.000")
        }

        if(!arg) return message.reply(embed)
        if(arg === "depositar") {
            
        }
    }
}