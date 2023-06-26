import sequelize from "../db/index.js";
import Sequelize from "sequelize-cockroachdb"


const CustProduct = sequelize.define("custproduct",{
    _id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.TEXT
    },
    did:{
      type:Sequelize.INTEGER
    },
    mid:{
      type:Sequelize.INTEGER
    },
    price:{
      type:Sequelize.INTEGER
    },
    category:{
      type:Sequelize.TEXT
    },
    distributerName:{
      type: Sequelize.TEXT
    }
  
})

export default CustProduct
  