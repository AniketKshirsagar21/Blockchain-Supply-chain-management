import sequelize from "../db/index.js";
import Sequelize from "sequelize-cockroachdb"

const Distributer = sequelize.define("distributer",{
    _id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.TEXT
    },
    desc:{
        type:Sequelize.TEXT
    },
    latitude:{
        type:Sequelize.FLOAT
    },
    longitude:{
        type:Sequelize.FLOAT
    },
    products:{
        type:Sequelize.JSONB
    },
    address:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.TEXT
    },
    requested:{
        type:Sequelize.JSONB
    },
    requests:{
        type:Sequelize.JSONB
    }


})
export default Distributer