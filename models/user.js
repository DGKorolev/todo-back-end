'use strict';
const {
  Model
} = require('sequelize');
const {hashSync} = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Task, Token}) {

      this.hasMany(Task, {
        as: 'tasks',
        foreignKey: 'user_id'
      })

      this.hasMany(Token, {
        as: 'tokens',
        foreignKey: 'user_id'
      })

    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hashSync(value, 5));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};