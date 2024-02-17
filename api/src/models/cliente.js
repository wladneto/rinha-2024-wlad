'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Cliente.init({
    limite: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    saldo: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: true,
    updatedAt: false
  });
  return Cliente;
};