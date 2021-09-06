'use strict';


module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Tasks',
            'user_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id"
                }
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Tasks',
            'UserId'
        )
    }
};
