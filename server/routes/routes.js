import express from "express";

const router = express.Router();

////////////////////////// Manufacturer ///////////////////////////////////////////////////
import { addManufacturer, addProduct, getAllManufacturer, addRequest, loginManufacturer, shipped, getRequest, getShipped } from "../controller/manufacturer/manufacturer-controller.js";

router.post("/addmanufacturer",addManufacturer)
router.get("/getallmanufacturer",getAllManufacturer)
router.post("/addproduct",addProduct)
router.post("/loginmanufacturer",loginManufacturer)
router.post("/shipped/:id",shipped)
router.post("/maddrequest/:id",addRequest)
router.get("/mgetrequest/:id",getRequest)
router.get("/mgetshipped/:id",getShipped)



///////////////////////// Distributer /////////////////////////////////////////////////////
import { addDistributer, addProductDist, addRequestDis, deleteProduct, getAllDistributer, getDistProduct, getRequestedDis, getRequestsDis, loginDistributer, requestProduct } from "../controller/distributer/distributer-controller.js";



router.post("/adddistributer",addDistributer)
router.get("/getalldistributer",getAllDistributer)
router.get("/deleteproductdist/:id",deleteProduct) // id of product
router.post("/addproductdist/:id",addProductDist) // id of distributer
router.post("/logindistributer",loginDistributer)
router.post("/requestproductdis/:id",requestProduct)
router.post("/addrequestdis/:id",addRequestDis)
router.get("/getrequestdis/:id",getRequestsDis)
router.get("/getrequesteddis/:id",getRequestedDis)
router.get("/getdistproduct/:id",getDistProduct)

//////////////////////// Product //////////////////////////////////////////////////////////
import { addCustProduct, getAllProduct, getCustProduct, getProduct } from "../controller/product/product-controller.js";

router.get("/getallproduct",getAllProduct)
router.get("/getproduct/:id",getProduct)
router.get("/getcustproduct",getCustProduct)
router.post("/addcustproduct",addCustProduct)

// router.get("/deletecustpro",deletcustproduct)
//////////////////////// Customer //////////////////////////////////////////////////////////
import { getAllCustomer , addCustomer, loginCustomer } from "../controller/customer/customer-controller.js";
router.post("/addcustomer",addCustomer)
router.get("/getallcustomer",getAllCustomer)
router.post("/logincustomer",loginCustomer)
export default router;










// router.get("/list",(req,res)=>{
//     People.sync({
//         force:false,
//     }).then(function(){
//         return People.findAll();
//     }).then(function(people){
//         res.send(people)
//     })
// })

// const People = sequelize.define("people",{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.TEXT
//     }
// })
// app.post("/add",(req,res) => {
//     console.log(req.body)
//     People.sync({
//         force:false,
//     }).then(function() {
        
//         return People.bulkCreate([{
//             name:req.body.name
//         },])
//     }).catch(err=>{
//         console.log(err)
//     })
//     res.send("People created")
// })