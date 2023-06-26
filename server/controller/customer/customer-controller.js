import sequelize from "../../db/index.js";
import Sequelize from "sequelize-cockroachdb"
import Customer from "../../tables/customer.js";


export const addCustomer = async(req,res) => {
    try {
        const newCustomer = {
            name:req.body.fullname,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            desc:req.body.description
        };
        const cust = await Customer.bulkCreate([newCustomer])
        console.log("Customer added",cust)
        res.status(200).json(cust)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getAllCustomer = async(req,res) => {
    try {
        const data = await Customer.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const addProductCust = async(req,res) => {
    try {
        const data = await Customer.findByPk(req.params.id)
        if(data) {
            data.products.push(req.body.obj)
            await data.save()
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const numDeleted = async(req,res) =>{
    try{
        const data = await Distributer.destroy({
            where: {
              id: {
                [Distributer.in]: products.map(obj => obj.id),
              },
            },
          });
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export const loginCustomer = async(req,res) => {
    try {
        const data = await Customer.findAll({
            where:{
                walletaddress : req.body.walletaddress
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}