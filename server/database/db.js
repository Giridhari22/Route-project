const { Sequelize } = require("sequelize");


// const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.PASSWORD, {

//     host: process.env.HOST,

//     dialect: process.env.DIALECT

// });

const sequelize = new Sequelize("db_sdirect", "sdirect","Sm@rtPu92023", {
    host: "192.168.0.2",
    dialect: "mysql"
});


sequelize.authenticate().then(async () => {

    console.log("Db connected")

    await sequelize.sync({force:false})



}).catch((e) => {

    console.log(e)

})




module.exports = sequelize;