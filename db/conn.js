const Sequelize = require("sequelize");
const sequelize = new Sequelize("thoughts", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado!");
} catch(err) {
  console.log(`Nao foi possivel conectar: ${err}`);
}

module.exports = sequelize;