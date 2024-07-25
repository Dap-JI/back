module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      tableName: "User",
    }
  );

  return User;
};
