import Manufacturer from "../../tables/manufacturer.js";
import Products from "../../tables/products.js";


export const addManufacturer = async(req,res) => {
    try {
        console.log(req.body)
        const newManufacturer = {
            name:req.body.fullname,
            desc:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            password:req.body.password,
            address:req.body.walletaddress
        };
        console.log(newManufacturer)
        const manu = await Manufacturer.bulkCreate([newManufacturer])
        res.status(200).json(manu)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getAllManufacturer = async(req,res) => {
    try {
        const data = await Manufacturer.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const addProduct = async(req,res) => {
    try {

        const newProduct = {
            _id:req.body._id,
            name:req.body.productname,
            desc:req.body.description,
            code:req.body.productcode,
            price:req.body.productprice,
            category:req.body.productcat,
            manufacturerId:req.body.manufacturerId,

        }
        const data = await Products.bulkCreate([newProduct]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const loginManufacturer = async(req,res) => {
    try {
        // console.log(req.body.address)
        const data = await Manufacturer.findAll({
            where:{
                address : req.body.address
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const del = async(req,res) => {
    try {
        const data = await Manufacturer.findByPk(req.params.id)
        data.shipped = {}
        await data.save()
        res.status(200).json(data)
    } catch (error) {
        res.status(error.message)
    }
}

export const shipped = async(req,res) => {
    try {
        // console.log(req.body._id,"herebro")
        const data = await Manufacturer.findByPk(req.params.id)

        let arr = [...Object.values(data.requests)]
        // console.log(arr,"arr")
        
       let arr1 = arr.filter((ele,i) => ele[i]?.obj?._id != req.body._id)
        if(arr1.length != arr.length)
            data.requests = {...arr1}
        
        arr = [...Object.values(data.shipped)]
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
        // console.log(newVal,"new")
        data.shipped = newVal
        await data.save()
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addRequest = async(req,res) => {
    try {
        // console.log(req.body)
        let data = await Manufacturer.findByPk(req.params.id)
        // const arrayOfObj = Object.entries(objOfObjs).map((e) => ( { [e[0]]: e[1] } ));
        // let arr = data.requests || {};
        let arr = [...Object.values(data.requests)]
        const obj = {
            _id : req.body._id,
            did : req.body.did,
            name : req.body.name,
            manufacturerName: req.body.manufacturerName,
            mid : req.body.mid,
            price: req.body.price,
            category:req.body.category
        }
        console.log(arr,"arr")
        arr.push(obj)
        let newVal = {
            
            ...arr         
        }
        console.log(newVal,"newVal")
        data.requests = newVal
        // console.log(data)
        await data.save()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getRequest = async(req,res) => {
    try {
        const data = await Manufacturer.findByPk(req.params.id)
        res.status(200).json(data.requests)       
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getShipped = async(req,res) => {
    try {
        const data = await Manufacturer.findByPk(req.params.id)
        res.status(200).json(data.shipped)        
    } catch (error) {
        res.status(500).send(error.message)
    }
}