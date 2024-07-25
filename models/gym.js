module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define(
    "Gym",
    {
      gym_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notice: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Gym",
    }
  );

  return Gym;
};
