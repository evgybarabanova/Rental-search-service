module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Baskets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entry_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Entries',
					key: 'id',
				},
			},
      user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Baskets');
  },
};
