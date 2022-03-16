const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Entry extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Image, { foreignKey: 'entry_id' });
			this.belongsToMany(models.User, {
				through: models.Basket,
				foreignKey: 'entry_id',
				otherKey: 'user_id',
			});
		}
	}
	Entry.init({
		title: DataTypes.STRING,
		body: DataTypes.TEXT,
		user_id: DataTypes.INTEGER,
		type: DataTypes.STRING,
		rooms: DataTypes.INTEGER,
		geo: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Entry',
	});
	return Entry;
};
