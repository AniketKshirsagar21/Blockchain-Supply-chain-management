import Sequelize from "sequelize-cockroachdb"

let sequelize = new Sequelize({
    dialect:"postgres",
    username:"modern",
    password:"MnVN7SHpFsR0_dYvSxqXZQ",
    host:"grey-giant-2677.7s5.cockroachlabs.cloud",
    port:26257,
    database:"defaultdb",
    logging:false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default sequelize