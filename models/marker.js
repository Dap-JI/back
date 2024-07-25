module.exports = (sequelize, DataTypes) => {
  const Marker = sequelize.define(
    "Marker",
    {
      marker_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      adress_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Adress",
          key: "adress_idx",
        },
      },
    },
    {
      timestamps: false,
      tableName: "Marker",
    }
  );

  return Marker;
};
