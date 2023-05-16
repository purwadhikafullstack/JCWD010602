"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.availability = require("./availability")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.picture = require("./picture")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.productpicture = require("./productpicture")(sequelize, Sequelize);
db.review = require("./review")(sequelize, Sequelize);
db.room = require("./room")(sequelize, Sequelize);
db.roompicture = require("./roompicture")(sequelize, Sequelize);
db.roomspecialprice = require("./roomspecialprice")(sequelize, Sequelize);
db.tenant = require("./tenant")(sequelize, Sequelize);
db.transaction = require("./transaction")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.verification = require("./verification")(sequelize, Sequelize);

// table verification
db.verification.belongsTo(db.user, { foreignKey: "userId" });
//table tenant
db.tenant.belongsTo(db.user, { foreignKey: "userId" });
//table review
db.review.belongsTo(db.user, { foreignKey: "userId" });
db.review.belongsTo(db.product, { foreignKey: "productId" });
//table room
db.room.belongsTo(db.product, { foreignKey: "productId" });
//table roomspecial
db.roomspecialprice.belongsTo(db.room, { foreignKey: "roomId" });
//table availability
db.availability.belongsTo(db.room, { foreignKey: "roomId" });
//table product
db.product.belongsTo(db.category, { foreignKey: "categoryId" });
db.product.belongsTo(db.tenant, { foreignKey: "tenantId" });
//table transaction
db.transaction.belongsTo(db.user, { foreignKey: "userId" });
db.transaction.belongsTo(db.room, { foreignKey: "roomId" });
db.transaction.belongsTo(db.availability, { foreignKey: "availabilityId" });
//table productpicture
db.productpicture.belongsTo(db.product, { foreignKey: "productId" });
db.productpicture.belongsTo(db.picture, { foreignKey: "pictureId" });
//table roompicture
db.roompicture.belongsTo(db.room, { foreignKey: "roomId" });
db.roompicture.belongsTo(db.picture, { foreignKey: "pictureId" });

module.exports = db;
