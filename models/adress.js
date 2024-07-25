module.exports = (sequelize, DataTypes) => {
  const Adress = sequelize.define(
    "Adress",
    {
      adress_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Adress",
    }
  );

  return Adress;
};
