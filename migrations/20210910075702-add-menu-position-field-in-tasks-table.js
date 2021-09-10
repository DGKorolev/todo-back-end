'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Tasks',
            'menu_position',
            {
                type: Sequelize.INTEGER,
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Tasks',
            'menu_position'
        )
    }
};
