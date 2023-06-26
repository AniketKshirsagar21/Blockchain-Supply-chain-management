import express from "express";
import cors from "cors";
import sequelize from "./db/index.js";
import Sequelize from "sequelize-cockroachdb"
import bodyParser from "body-parser";
import Router from "./routes/routes.js";

const app = express();
app.use(
    cors()
  );
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/",Router)
const PORT = process.env.port || 3001;


// let sequelize = new Sequelize({
//     dialect:"postgres",
//     username:"modern",
//     password:"MnVN7SHpFsR0_dYvSxqXZQ",
//     host:"grey-giant-2677.7s5.cockroachlabs.cloud",
//     port:26257,
//     database:"defaultdb",
//     logging:false,
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })


// const CustProduct = sequelize.define("custproduct",{
//   _id:{
//       type:Sequelize.INTEGER,
//       primaryKey:true
//   },
//   name:{
//       type:Sequelize.TEXT
//   },
//   did:{
//     type:Sequelize.INTEGER
//   },
//   mid:{
//     type:Sequelize.INTEGER
//   },
//   price:{
//     type:Sequelize.INTEGER
//   },
//   category:{
//     type:Sequelize.TEXT
//   },
//   distributerName:{
//     type: Sequelize.TEXT
//   }

// })

// const Products = sequelize.define("products",{
//     _id:{
//         type:Sequelize.INTEGER,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.TEXT
//     },
//     desc:{
//         type:Sequelize.TEXT
//     },
//     code:{
//         type: Sequelize.INTEGER
//     },
//     price:{
//         type: Sequelize.FLOAT,  
//     },
//     category:{
//         type:Sequelize.TEXT
//     },
//     manufacturerId:{
//       type: Sequelize.INTEGER,
//       references: {
//       model: Manufacturer,
//       key: '_id',
//       },
  
//   }
//   })


// Products.belongsTo(Manufacturer)

// Distributer.create()
// Products.belongsTo(Manufacturer)

// Manufacturer.drop()
app.post("/addcustpro",(req,res) => {
    console.log(req.body)
    CustProduct.sync({
        force:false,
    }).then(function() {
        
        return CustProduct.bulkCreate([{
          _id:req.body.id,
          name:req.body.name,
          price:req.body.price,
          category:req.body.cat,
          mid:req.body.mid,
          did:req.body.did,
          distributerName:req.body.dname
        },])
    }).catch(err=>{
        res.send(err)
    })
    
})


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});