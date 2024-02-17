'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transacao.init({
    clienteid: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    valor: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      }
    },
    tipo: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 1],
        isIn: [['c', 'd']]
      }
    },
    descricao: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 10]
      }
    }
  }, {
    sequelize,
    modelName: 'Transacao',
    timestamps: true,
    updatedAt: false
  });
  return Transacao;
};