const {Sequelize} = require('sequelize')



const sequelize = new Sequelize ('product_db', 'root', 'root', {
    localhost: "127.0.0.1",
    dialect: "mysql",

})

module.exports = sequelize