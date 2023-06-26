import sequelize from "../../db/index.js";
import Sequelize from "sequelize-cockroachdb"
import Distributer from "../../tables/distributer.js";
import Products from "../../tables/products.js";


export const addDistributer = async(req,res) => {
    try {
        console.log(req.body)
        const newDistributer = {
            name:req.body.fullname,
            desc:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            password:req.body.password,
            address:req.body.walletaddress
        };
        const dist = await Distributer.bulkCreate([newDistributer])
        // console.log("distributer added",dist)
        res.status(200).json(dist)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getAllDistributer = async(req,res) => {
    try {
        const data = await Distributer.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const requestProduct = async(req,res) => {
    try {
        // const data = await Products.findByPk(req.params.id)
        let data = await Distributer.findByPk(req.params.id)
        // console.log(data.requested)
        let arr = [...Object.values(data.requested)]
        const obj = {
            _id : req.body._id,
            did : req.body.did,
            name : req.body.name,
            manufacturerName: req.body.manufacturerName,
            mid : req.body.mid,
            price: req.body.price,
            category:req.body.category
        }
        arr.push(obj)
        let newVal = {
            ...arr            
        }
        data.requested = newVal
        await data.save()

        res.status(200).json(requested)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const addProductDist = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
    
        let arr = [...Object.values(data.requests)]
        let arr1 = arr.filter((ele,i) => ele[i]?.obj?._id != req.body._id)
        if(arr1.length != arr.length)
            data.requests = {...arr1}
        
        arr = [...Object.values(data.products)]
        const obj = {
            _id : req.body._id,
            did : req.body.did,
            name : req.body.name,
            manufacturerName: req.body.manufacturerName,
            mid : req.body.mid,
            price: req.body.price,
            category:req.body.category
        }
        arr.push(obj)
        let newVal = {
            ...arr            
        }
        console.log(newVal,"new")
        data.products = newVal
        await data.save()
        
        res.status(200).json(data)  
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addRequestDis = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
        let arr = [...Object.values(data.requested)]
        let arr1 = arr.filter((ele,i) => ele[i]?.obj?._id != req.body._id)
        if(arr1.length != arr.length)
          data.requested = {...arr1}
        
        arr = [...Object.values(data.requests)]
        const obj = {
            _id : req.body._id,
            did : req.body.did,
            name : req.body.name,
            manufacturerName: req.body.manufacturerName,
            mid : req.body.mid,
            price: req.body.price,
            category:req.body.category
        }
        arr.push(obj)
        let newVal = {
            ...arr            
        }
        data.requests = newVal
        await data.save()
        console.log(data)
        return res.status(200).json(data)


    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getRequestsDis = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
        res.status(200).json(data.requests)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getRequestedDis = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
        res.status(200).json(data.requested)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteProduct = async(req,res) => {
    try {
        const deletedRow = await Products.destroy({
            where:{
                _id:req.params.id
            }
        })

        res.status(200).json(deletedRow)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const loginDistributer = async(req,res) => {
    try {
        console.log(req.body)
        const data = await Distributer.findAll({
            where:{
                address : req.body.address
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getDistProduct = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
        res.status(200).json(data.products)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deldis = async(req,res) => {
    try {
        const data = await Distributer.findByPk(req.params.id)
        data.requests = {}
        data.requested = {}
        await data.save()
        res.status(200).json(data)
    } catch (error) {

        res.status(500).send(error.message)
    }
}