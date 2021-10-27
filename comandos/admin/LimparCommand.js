const Discord = require('discord.js'); // puxando a livraria 'discord.js'

module.exports.help = {
    'name': 'limpar',
    'aliases': ['clear', 'clearchat']
  }

exports.run = async (client, message, args) => { // setando as bases 
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`você precisa da permissão \`MANAGE_MESSAGES\`.`) // caso o autor nao possua, vamos dar o erro
 
    let clean = args.slice(0).join(' '); // puxando uma quantidade de numero, partindo dos argumentos zero
    if(isNaN(clean)) return message.reply("Você deve inserir um numero valido, verifique os argumentos citados e tente novamente! Caso isto não tenha funcionado do mesmo jeito, chame o meu criador, Koddy#1004")
 // caso o membro bote um numero menor que 2, ou maior que 100, pediremos um numero acima
    if (clean < 2 || clean > 100) return message.reply(`escreva um número de: \`2 à 100\`!`)
    // caso o membro não escreva um numero
    if (args.length === 0) return message.reply(`escreva um número de: \`2 à 100\`!`) 
    try { // utilizando a function 'try', traduzindo: tentar
        let deletado = await message.channel.bulkDelete(clean).length // tentaremos deletar a quantia que o membro pediu
        // enviando uma embed
        let embed = new Discord.MessageEmbed()

        .setTitle(`LIMPEZA`)
        .setDescription(`Limpei um total de \`${deletado}\` mensagens.`)
        .setColor('#0000')
        .setFooter(message.guild.name + " - © 2021").setColor("#00ffff").setTimestamp()
        message.channel.send(embed)
    } catch(e){ // procurando um erro
        console.log(e); // caso consiga encontrar, daremos o erro
    }
}