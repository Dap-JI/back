module.exports = (sequelize, DataTypes) => {
  const Coment = sequelize.define(
    "Coment",
    {
      coment_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      board_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Board",
          key: "board_idx",
        },
      },
      user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_idx",
        },
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: "created_at",
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      tableName: "Coment",
    }
  );

  return Coment;
};
