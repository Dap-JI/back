module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      post_idx: {
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
      gym_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Gym",
          key: "gym_idx",
        },
      },
      clearday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      media: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      thumbnailUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(10),
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
      tableName: "Post",
    }
  );

  return Post;
};
