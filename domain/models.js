const { Model, DataTypes } = require('sequelize');

// Define el modelo User para Sequelize
class User extends Model {}

function initializeUserModel(sequelize) {
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cellphone: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    activationToken: DataTypes.STRING,
    verifiedAt: DataTypes.DATE,
  }, { sequelize, modelName: 'user' });

  return User;
}

module.exports = { initializeUserModel };
