const { DataTypes, Model } = require('sequelize');

module.exports = class Usuarios extends Model {
    static init(sequelize) {
        return super.init({
            grupo: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            user: { 
                type: DataTypes.STRING
            },
            carteira: { 
                type: DataTypes.FLOAT
            },
            banco: { 
                type: DataTypes.FLOAT
            },
            bancoPago: { 
                type: DataTypes.BOOLEAN
            },

        }, {
            tableName: 'Money',
            timestamps: true,
            sequelize
        });
    }
}