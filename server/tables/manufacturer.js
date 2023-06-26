import sequelize from "../db/index.js";
import Sequelize from "sequelize-cockroachdb"

const Manufacturer = sequelize.define("manufacturer",{
    _id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.TEXT
    },
    password:{
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
    address:{
        type:Sequelize.STRING
    },
    shipped:{
        type:Sequelize.JSONB
    },
    requests:{
        type:Sequelize.JSONB
    }
    

})
export default Manufacturer