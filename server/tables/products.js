import sequelize from "../db/index.js";
import Sequelize from "sequelize-cockroachdb"
import Manufacturer from "./manufacturer.js";

const Products = sequelize.define("products",{
    _id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.TEXT
    },
    desc:{
        type:Sequelize.TEXT
    },
    code:{
        type: Sequelize.INTEGER
    },
    price:{
        type: Sequelize.FLOAT,  
    },
    category:{
        type:Sequelize.TEXT
    },
    manufacturerId:{
      type: Sequelize.INTEGER,
      references: {
      model: Manufacturer,
      key: '_id',
      },
  
  }
  })


Products.belongsTo(Manufacturer)
export default Products