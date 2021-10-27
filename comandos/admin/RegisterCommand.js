const Discord = require('discord.js'); 
const Register = require("../../db/Models/RegisterSystem")
module.exports.help = {
  'name': 'rmanager',
  'aliases': ['registromanager', 'gerenciar_registros']
}

exports.run = async (client, message, args) => {
    if(message.member.permissions.has("ADMININSTRATOR")) {
    const findG = await Register.findOne({
        where: {
            grupo: message.guild.id
        }
    });
    if(findG) {
        let array = findG.roles
        if(array === null) { await findG.update({
            roles: ["test"]
        })}
        console.log(array)
        
        let add_remove = args[0]
        if(!add_remove) return  message.reply(new Discord.MessageEmbed()
        .setTitle("❌ | Argumentos invalidos")
        .setDescription(`
        Você deve Inserir um argumento para continuar
        Exemplos:
        
        ${client.prefix}${module.exports.help.name} <add ( adicionar ) ou rem ( remover )> <cargo>
        ${client.prefix}${module.exports.help.name} add @cargo
        ${client.prefix}${module.exports.help.name} rem @cargo`));

if(add_remove === "rem") {
    const cargo = message.mentions.roles.first()
    if(!cargo) return  message.reply(new Discord.MessageEmbed()
    .setTitle("❌ | Argumentos invalidos")
    .setDescription(`
    Você deve Inserir um argumento para continuar
    Exemplos:
    
    ${client.prefix}${module.exports.help.name} <add ( adicionar ) ou rem ( remover )> <cargo>
    ${client.prefix}${module.exports.help.name} add @cargo
    ${client.prefix}${module.exports.help.name} rem @cargo`));
    array.filter(obj => {
        
    }) } else if(add_remove === "add") {
        console.log('Consgui')
        const cargo = message.mentions.roles.first()
        if(!cargo) return  message.reply(new Discord.MessageEmbed()
        .setTitle("❌ | Argumentos invalidos")
        .setDescription(`
        Você deve Inserir um argumento para continuar
        Exemplos:
        
        ${client.prefix}${module.exports.help.name} <add ( adicionar ) ou rem ( remover )> <cargo>
        ${client.prefix}${module.exports.help.name} add @cargo
        ${client.prefix}${module.exports.help.name} rem @cargo`));
        const newArray = array.push({
                name: cargo.name,
                id: cargo.id
        })
        console.log(newArray)

    }
        } else {

            message.reply(new Discord.MessageEmbed()
            .setTitle("✅ | Sistema Ativado")
            .setDescription("Este sistema ainda não tinha sido ativado, por tanto, execute novamente o comando."))
            await Register.create({
                grupo: message.guild.id,
                roles: []
            })
        }
    } else {

    message.reply(new Discord.MessageEmbed()
    .setTitle("❌ | Sem permissão")
    .setDescription("Você não possue permissão suficiente para executar este comando, desculpe..."))
    }
}