const { Sequelize } = require("sequelize");
const { modelRelations } = require("./models/relations");

const sequelize = new Sequelize(
  // Konstruktoriuje nurodome konfigūraciją
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

const modelDefiners = [
  //   require("./models/menu.model"),
  //   require("./models/order.model"),
  require("./models/user.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

modelRelations(sequelize);

module.exports = sequelize;
