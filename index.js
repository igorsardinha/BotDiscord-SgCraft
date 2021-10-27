const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const disbut1 = require("discord-buttons")(client)
const disbut = require("discord-buttons")
/* 

      Carregando o arquivo de configuração

*/


let config = require("./config.json")

/*

      Configuração de Musica

*/
const embeds = require('./embeds')
client.queue = new Discord.Collection()


/* 

      Configuração da Database

*/

const Database = require("./db/DatabaseLogin")
const Welcome = require("./db/Models/WelcomeSystem");
const AutoRole = require("./db/Models/AutoRoleSystem");
const AntiInvite = require("./db/Models/AntiInviteSystem");
const Sugestion = require("./db/Models/SugestionSystem");
const Logs = require("./db/Models/LogsSystem");
const ip = require("./db/Models/StatusSystem");
const Punish = require("./db/Models/PunishSystem");
const ChannelComand = require("./db/Models/ChannelCommandSystem")
const BlackList = require("./db/Models/BlackListSystem")
const Ticket = require("./db/Models/TicketSystem")
const Plugin = require("./db/Models/PluginSystem")
const Captcha = require("./db/Models/CaptchaSystem")
const Register = require("./db/Models/RegisterSystem")
const Money = require("./db/Models/MoneyTable")
/* 

      Sistema de Carregar os Comandos.

*/


const fs = require("fs");

client.commands = new Discord.Collection();
client.prefix = config.bot.prefix;

client.aliases = new Discord.Collection();


fs.readdirSync('./comandos').forEach(dirs => {
    const commands = fs.readdirSync(`./comandos/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const props = require(`./comandos/${dirs}/${file}`);
        
        console.log(`Carregando o comando: ${props.help.name}`);
        client.commands.set(props.help.name, props);
        if(props.help.aliases) {
          props.help.aliases.forEach(aliases => {
            client.aliases.set(aliases, props.help.name)
          })
        }
    };
});

/* 

      Sistema de Alerta ao bot ser Ligado

*/


client.on("ready", () => {
    console.log(`
    Criador: uKoddy#0144
    Nome: ${client.user.tag}
    Id: ${client.user.id}
    
    Grupos: ${client.guilds.cache.size}
    Usuarios: ${client.users.cache.size}
    Canais: ${client.channels.cache.size}`)

    Database.authenticate().then(() => {
        console.log("[DataBase] CONECTADO COM SUCESSO!")
        AutoRole.init(Database).sync({force: true})
        Welcome.init(Database).sync({force: false})
        AntiInvite.init(Database).sync({force: false})
        Sugestion.init(Database).sync({force: false})
        Logs.init(Database).sync({force: false})
        ip.init(Database).sync({force: false})
        Punish.init(Database).sync({force: false})
        ChannelComand.init(Database).sync({force: false})
        BlackList.init(Database).sync({force: false})
        Ticket.init(Database).sync({force: false})
        Captcha.init(Database).sync({force: false})
        Plugin.init(Database).sync({force: false})
        Register.init(Database).sync({force: false})
        Money.init(Database).sync({force: true})
    }).catch(error => {
            console.error("[DataBase] Ocorreu um erro ao conectar na Database: " + error);
        })
    
        var tabela = [ // criando uma variavel, nomeada de tabela 

// uma notinha: toda vez que for criar uma nova presence na nossa tabela, bote uma vírgula no final!
        {name: 'Canal de Lives do S4RD1NH4', type: 'STREAMING', url: 'https://www.twitch.tv/sardinhagamer_hd'},
        {name: 'Use !ajuda', type: 'WATCHING'},
		{name: 'Acesse status.sgcraft.com.br', type: 'WATCHING'},
        {name: '#FiqueEmCasa', type: 'LISTENING'},
        {name: 'loja.sgcraft.com', type: 'PLAYING'},
    ];

    function setStatus() { // nomeamos ela de: setStatus
        // agora, iremos criar um sistema randômico, alternando entre as opções que criamos para a tabela
        var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
        client.user.setActivity(altstatus) // por fim, setando a presence. No caso, o jogo é a variavel que criamos 'altstatus'
    }
    setStatus(); // para finalizar, puxamos a function que criamos no inicio
    setInterval(() => setStatus(), 50000) // e adicionamos um intervalo entre as presences


})



/*

Sistema de ticket por butão

*/

client.on('clickButton', async (button) => {
  await button.defer();
  try {
    if(!button.clicker.user.bot) {
      test(button, 0, button.clicker.user, button.message)
      test(button, 1, button.clicker.user, button.message)
      test(button, 2, button.clicker.user, button.message)
      let canal = button.message.channel.name
      if(canal.startsWith(config.ticket.types[0].toLowerCase()) || canal.startsWith(config.ticket.types[1].toLowerCase()) || canal.startsWith(config.ticket.types[2].toLowerCase())) {
       
      if(button.id === "fechar") {
        const findP = await Ticket.findOne({where: {
          closeMessageId: button.message.id
        }})
        if(findP) {
         await button.message.channel.messages.fetch().then(msg22 => {
          var logStream = fs.createWriteStream('./temp/tickets/ticket_'+ client.users.cache.get(findP.authorId).username+'.txt', {flags: 'w'});
          for (let [key, value, embeds] of msg22) {
            var hour = "",
                 minutes = "",
                seconds = ""
            const date = new Date(value.createdTimestamp);
              if(date.getDay() <= 9) { day = "0"+date.getDay() } else { day = date.getDay() }
              if(date.getMonth() <= 9) { month = "0"+date.getMonth() } else { month = date.getMonth() }
              if(date.getHours() <= 9) { hour = "0"+date.getMonth() } else { your = date.getMonth() }
              if(date.getMinutes() <= 9) { minutes = "0"+date.getMinutes() } else { minutes = date.getMinutes() }
              
              if(date.getSeconds() <= 9) { seconds = "0"+date.getSeconds() } else { seconds = date.getSeconds() }
              let dateString = `${day}/${month}/${date.getFullYear()} ${hour}:${minutes}:${seconds}`;
  
  logStream.write(`${value.author.tag} - ${dateString}\nMensagem: ${value.content}\n`)
          
        }
        logStream.end("FIM!");
         })
          button.message.channel.send("Finalizando ticket em 5 segundos").then(m2 => {
            setTimeout(() => {
              client.users.cache.get(findP.authorId).send("O seu ticket foi finalizado por: " + button.clicker.user.tag, {
                files: ['./temp/tickets/ticket_'+ client.users.cache.get(findP.authorId).username+'.txt']
              })
              let path = './temp/tickets/ticket_'+ client.users.cache.get(findP.authorId).username+'.txt'
              setTimeout(() => {
                try {
                  fs.unlinkSync(path)
                  findP.destroy()
              button.message.channel.delete()
                  //file removed
                } catch(err) {
                  console.error(err)
                }
              }, 4500)
  
              
              
            }, 3000)
        })
      }
    }
      }
    }
  } catch (error) {
    console.log("Interação Indisponivel")
  }

});

async function test(button, numero, user, message) {
  if(button.id === config.ticket.types[numero]) {
    const findG = await Ticket.findOne({where: {
      authorId: user.id
    }})
    if(findG) {

      user.send('Você já tem um ticket aberto!')
  
  } else {
      
      const canal = await message.guild.channels.create(config.ticket.types[numero].toLowerCase() + '-' + user.username, {
        parent: config.ids.categories.ticket,
        topic: 'User Support: ' + user.tag,
        type: 'text',
        permissionOverwrites: [
          {
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              id: user.id
          },
          {
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              id: config.ids.roles.manager
          },
          {
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
              id: config.ids.roles.eco_founder
          },
          {
              deny: 'VIEW_CHANNEL',
              id: message.guild.id
          }
      ]
      })

      let newTicket = await Ticket.create({
        authorId: user.id,
        channelId: canal.id,
        guildId: message.guild.id,
        resolved: false
    });
    let btn = new disbut.MessageButton()
    .setStyle("red")
    .setEmoji("❎")
    .setID("fechar")
      canal.send({
        embed: embeds.ticketOpen,
        button: btn
      }).then(msg => {
        newTicket.update({closeMessageId: msg.id})      
      })
      


    }
  }
}


/* 

      Sistema de AutoRole

*/


client.on("guildMemberAdd", async member => {
    const findG = await AutoRole.findOne({
      where:{
        grupo: member.guild.id
      }
    })
    if(findG) {
      member.roles.add(findG.cargo)
    }
    
  }) 
  

/* 

      Sistema de Bem Vindo

*/

   client.on("guildMemberAdd", async (member) => {
      const guild = member.guild;
      console.log(guild)
    const findG = await Welcome.findOne({
      where:{
        grupo: member.guild.id
      }
    })
    if(findG) {
        var entrada = new Discord.MessageEmbed()
        .setTitle(`📨 Recepção | SgCraft Network `)
        .setDescription(`👋 Olá ${member.user.username}, seja bem vindo(a) ao 
**Discord Oficial** da **SgCraft Network**!

Fique por dentro de todas as regras 
do servidor para evitar **punições**!

IP para conexão: jogar.sgcraft.com.br
UpTime: status.sgcraft.com.br
Link de acesso para a loja: https://loja.sgcraft.com`)
        .addField(`Ainda bem que você entrou!`, `Com você, agora possuímos ${guild.members.cache.size} jogadores`) 
        .setColor("RANDOM")
        .setFooter(`${guild.name} - Discord Oficial`, guild.iconURL())
        .setThumbnail(member.user.displayAvatarURL())
        
        client.channels.cache.get(findG.canal).send(entrada)
    }
  }) 


/*

	Sistema de Captcha

*/

client.on('messageReactionAdd', async (reaction, user) => {
    const member = await reaction.message.guild.members.fetch(user.id)
    if(reaction.emoji.name === "✅") {
        const findG = await AutoRole.findOne({
      where:{
        grupo: reaction.message.guild.id
      }
    })
    if(!findG) {}
        const findG2 = await Captcha.findOne({where:{
            grupo: reaction.message.guild.id
        }})
        if(findG2) {
            if( reaction.message.channel.id === findG2.canal) {
                if(!member.roles.cache.has(findG2.cargo)) {
                    member.roles.add(findG2.cargo)
                }
            }
        }
    }
    

})

/* 

      Sistema de Anti Invites

*/

client.on("message", async message => {
  let convite = /(discord.gg|discordapp.com)\/(invite)?/ig.test(message.content)
  if(convite === true) {
  const findG = await AntiInvite.findOne({where:{grupo: message.guild.id}, atribute: ['cargo']}) 
  if(findG){

  if(message.member.roles.cache.has(findG.cargo)){
    
return;
} else {
      message.delete()
  message.reply('Não pode divulgar convites de outros servidores aqui!!! 😡')}
}
  }
})

/* 

      Sistema de configuração

*/

client.on("message", async message => {
  let prefix = config.bot.prefix
  if (!message.content.startsWith(prefix)) return;
const findG = await ChannelComand.findOne({where:{grupo: message.guild.id}})
if(!findG) {

  //
  if(message.author.bot || message.channel.type === "dm") return;

  
  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let cmd = args.shift().toLowerCase();
  if(cmd !== "config") return message.reply("O canal de comandos ainda não foi defindo. Chame algum staff e mande configurar o servidor utilizando o m.config.")
  let command;
  if (client.commands.has("config")) {
      command = client.commands.get("config")
  } else if (client.aliases.has("config")) {
      command = client.commands.get(client.aliases.get("configurar"))
  } else return

  try {
      command.run(client, message, args)
  } catch (err) {
      console.log(err)
  }
}
})


/*

      Sistema de BlackList

*/

client.on("guildCreate", async guild => {
  const findG = await BlackList.findOne({where: {grupo: guild.id }})

if(!findG) {
  return guild.owner.send("Você não está na BlackList!")
} else {
  guild.owner.send("Você está na BlackList! Para remover você da blacklist, basta me adicionar no discord, uKoddy#0144.")
  guild.leave()

}

})

/* 

    Sistema de Usar comandos no canal principal

*/


client.on("message", async (message) => {
  let prefix = config.bot.prefix
  if (!message.content.startsWith(prefix)) return;
  const findG = await ChannelComand.findOne({where:{grupo: message.guild.id}})
  if(findG) {
  //
   
  if(message.author.bot || message.channel.type === "dm") return;
  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let cmd = args.shift().toLowerCase()
  
  let command;
  if (client.commands.has(cmd)) {
      command = client.commands.get(cmd)
  } else if (client.aliases.has(cmd)) {
      command = client.commands.get(client.aliases.get(cmd))
  } else return


  if(message.channel.id === findG.canal || message.channel.id === findG.canalstf || message.member.hasPermission('ADMINISTRATOR')) {

    try {
        command.run(client, message, args)
    } catch (err) {
        console.log(err)
    }    
  } else message.reply("Você não pode executar comandos aqui bobinho.")}
})

client.on('messageReactionAdd', async (reaction, user) => {
    
      /** 

Sistema de Ticket

*/

	if (user.bot) return;
  const message = reaction.message;
  if(message.channel.id === config.ids.channels.ticket) {
      
    reaction.users.remove(user.id)
    if(reaction.emoji.id === config.emojis.ids.a) {
      const findG = await Ticket.findOne({where: {
        authorId: user.id
      }})
      if(findG) {

        user.send('Você já tem um ticket aberto!')
    
    } else {
        
        const canal = await message.guild.channels.create('support-' + user.username, {
          parent: config.ids.categories.ticket,
          topic: 'Atendimento: ' + user.tag,
          type: 'text',
          permissionOverwrites: [
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: user.id
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.manager
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.eco_founder
            },
            {
                deny: 'VIEW_CHANNEL',
                id: reaction.message.guild.id
            }
        ]
        })

        let newTicket = await Ticket.create({
          authorId: user.id,
          channelId: canal.id,
          guildId: reaction.message.guild.id,
          resolved: false
      });

        canal.send(embeds.ticketOpen).then(msg => {
          newTicket.update({closeMessageId: msg.id})      
        })
        


      }
    }

    if(reaction.emoji.id === config.emojis.ids.b) {
      const findG = await Ticket.findOne({where: {
        authorId: user.id
      }})
      if(findG) {

        user.send('Você já tem um ticket aberto!')
    
    } else {
        
        const canal = await message.guild.channels.create('order-' + user.username, {
          parent: config.ids.categories.ticket,
          topic: 'Atendimento: ' + user.tag,
          type: 'text',
          permissionOverwrites: [
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: user.id
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.manager
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.eco_founder
            },
            {
                deny: 'VIEW_CHANNEL',
                id: reaction.message.guild.id
            }
        ]
        })

        let newTicket = await Ticket.create({
          authorId: user.id,
          channelId: canal.id,
          guildId: reaction.message.guild.id,
          resolved: false
      });

        canal.send(embeds.ticketOpen).then(msg => {
          newTicket.update({closeMessageId: msg.id})
          msg.react('❌');
             let filtro = (reactione, usuario) => reactione.emoji.name === "❌" && usuario.id !== message.client.user.id;
            const coletor = msg.createReactionCollector(filtro);
            coletor.on("collect", ap => {
            canal.send("Fechando ticket em 5 segundos...")
            setTimeout(() => {
                canal.delete();
                newTicket.destroy()
                }, 5000) 
            }) 
        
        })
        


      }
    }
      
    if(reaction.emoji.id === config.emojis.ids.c) {
      const findG = await Ticket.findOne({where: {
        authorId: user.id
      }})
      if(findG) {

        user.send('Você já tem um ticket aberto!')
    
    } else {
        
        const canal = await message.guild.channels.create('application-' + user.username, {
          parent: config.ids.categories.ticket,
          topic: 'Atendimento: ' + user.tag,
          type: 'text',
          permissionOverwrites: [
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: user.id
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.manager
            },
            {
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY'],
                id: config.ids.roles.eco_founder
            },
            {
                deny: 'VIEW_CHANNEL',
                id: reaction.message.guild.id
            }
        ]
        })

        let newTicket = await Ticket.create({
          authorId: user.id,
          channelId: canal.id,
          guildId: reaction.message.guild.id,
          resolved: false
      });

        canal.send(embeds.ticketOpen).then(msg => {
          newTicket.update({closeMessageId: msg.id})
          msg.react('❌');
             let filtro = (reactione, usuario) => reactione.emoji.name === "❌" && usuario.id !== message.client.user.id;
            const coletor = msg.createReactionCollector(filtro);
            coletor.on("collect", ap => {
            canal.send("Fechando ticket em 5 segundos...")
            setTimeout(() => {
                canal.delete();
                newTicket.destroy()
                }, 5000) 
            }) 
        
        })
        


      }
    }

  }
    
  })
  


client.login(config.bot.token)