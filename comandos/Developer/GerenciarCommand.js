module.exports.help = {
    'name': 'manage',
    'aliases': ['']
    }
    const BlackList = require("../../db/Models/BlackListSystem")
    const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    let serverid = args[0];
    let server = client.guilds.cache.get(serverid);
    if(!server) { message.reply("Servidor Inexistente ou então eu não estou nele.") } else {
        const findG = await BlackList.findOne({where: {grupo: server.id}})
        if(!findG) {
            server.leave();
            findG.create({grupo: serverid, dono: server.owner.id})
            message.reply("Grupo adicionado na blacklist com sucesso.")
        } else {
            message.reply("Grupo removido da blacklist com sucesso!")
        }
    }


}