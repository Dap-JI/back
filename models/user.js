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
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      introduce: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      provider: {
        type: DataTypes.ENUM,
        values: ["kakao", "naver"],
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
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
