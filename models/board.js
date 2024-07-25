module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      board_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_idx",
        },
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: "created_at",
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      tableName: "Board",
    }
  );

  return Board;
};
