'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {
        as: 'tasks',
        foreignKey: 'user_id'
      });
    }
  };

  Task.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
    },
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};