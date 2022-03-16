const {
	Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Entry, { foreignKey: 'user_id' });

			this.belongsToMany(models.Entry, {
				through: models.Basket,
				foreignKey: 'user_id',
				otherKey: 'entry_id',
			});
		}
	}
	User.init({
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		role: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};
