let Discord = require("discord.js")
let superagent = require("superagent")
let Status = require("../../db/Models/StatusSystem")
exports.run = async (client, message, args) => {

let findG = await Status.findOne({where:{grupo: message.guild.id}, attributes: ['ip']})
if(findG) {
console.log(findG)

    superagent.get('https://api.mcsrvstat.us/2/'+ findG.ip) ////// <- Coloque o IP do seu servidor 
    .end((err, response) => {
       
      let ping = response.body.ping
        let online1 = 'π’ ONLINE'
        let offline1 = 'π  OFFLINE/SEM RESPOSTA'



        let On = response.body.online ? online1 : offline1




            let embed = new Discord.MessageEmbed()
            .setTitle("βοΈ | Status do Servidor")
            .addField("π **IP**", "`"+findG.ip+"`")
            .addField("π **STATUS**", On, true)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.guild.name + " - Β© 2021").setColor("#00ffff").setTimestamp()
     if(On === online1 ){  
             let version1 = '--'
        let version2 = response.body.version
        let Versionn = response.body.version ? version2 : version1
        let online = response.body.players.online
                let maximo = response.body.players.max     
     embed.addField("**Jogadores Online**", online+"/"+maximo, true)
     embed.addField("**VersΓ£o**", Versionn, true)
            }
            embed.setColor("#FF0000")
            message.reply(embed).then(msg => {
                msg.react("π")
                let filter = (reaction, user, ) => reaction.emoji.name === "π" && user.id !== client.user.id
                let coletor = msg.createReactionCollector(filter)
                coletor.on('collect', r2 => {
                     embed = new Discord.MessageEmbed()
            .setTitle("βοΈ | Status do Servidor")
            .addField("π **IP**", "`"+findG.ip+"`")
            .addField("π **STATUS**", On, true)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.guild.name + " - Β© 2021").setColor("#00ffff").setTimestamp()
     if(On === online1 ){  
             let version1 = '--'
        let version2 = response.body.version
        let Versionn = response.body.version ? version2 : version1
        let online = response.body.players.online
                let maximo = response.body.players.max     
     embed.addField("**Jogadores Online**", online+"/"+maximo, true)
     embed.addField("**VersΓ£o**", Versionn, true)
                    }

                    msg.edit(embed)
                })
            })
         })


        } else {
           let embed = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setTitle(config.emojis.no + ' | ConfiguraΓ§Γ΅es')
  .setDescription(`ConfiguraΓ§Γ΅es Invalidas
  
  OlΓ‘ ${message.author}, nΓ£o configuraram este comando da forma correta.`)
  .setFooter('VocΓͺ acha que Γ© um Erro? Reporte para KoddyDev#5439.')
  message.reply(embed)   
        }

}
exports.help = {
    'name': 'ip',
    'aliases': ['status']
  }