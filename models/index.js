const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 모델 정의
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Gym = require("./gym")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Coment = require("./coment")(sequelize, Sequelize);
db.Adress = require("./adress")(sequelize, Sequelize);
db.Marker = require("./marker")(sequelize, Sequelize);

// 모델 간 관계 설정
db.User.hasMany(db.Post, {
  foreignKey: "user_idx",
  sourceKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Post.belongsTo(db.User, {
  foreignKey: "user_idx",
  targetKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Gym.hasMany(db.Post, {
  foreignKey: "gym_idx",
  sourceKey: "gym_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Post.belongsTo(db.Gym, {
  foreignKey: "gym_idx",
  targetKey: "gym_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.User.hasMany(db.Board, {
  foreignKey: "user_idx",
  sourceKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Board.belongsTo(db.User, {
  foreignKey: "user_idx",
  targetKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Board.hasMany(db.Coment, {
  foreignKey: "board_idx",
  sourceKey: "board_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Coment.belongsTo(db.Board, {
  foreignKey: "board_idx",
  targetKey: "board_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.User.hasMany(db.Coment, {
  foreignKey: "user_idx",
  sourceKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Coment.belongsTo(db.User, {
  foreignKey: "user_idx",
  targetKey: "user_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Adress.hasOne(db.Marker, {
  foreignKey: "adress_idx",
  sourceKey: "adress_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.Marker.belongsTo(db.Adress, {
  foreignKey: "adress_idx",
  targetKey: "adress_idx",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

module.exports = db;
