import sequelize from "../db/index.js";
import Sequelize from "sequelize-cockroachdb"



const Customer = sequelize.define("customer",{

    name:{
        type:Sequelize.TEXT
    },
    latitude:{
        type:Sequelize.FLOAT
    },
    longitude:{
        type:Sequelize.FLOAT
    },
    desc:{
        type: Sequelize.TEXT
    },
    products:{
        type:Sequelize.JSONB
    },
    address:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.TEXT
    }

})
export default Customer