import Manufacturer from "../../tables/manufacturer.js";
import Products from "../../tables/products.js";
import CustProduct from "../../tables/custproduct.js";

export const getAllProduct = async(req,res) => {
    try {
        const data = await Products.findAll({
            include: [
                {
                  model:Manufacturer,
                },
              ],
        })

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getProduct = async(req,res) => {
    try {
        console.log(req.params.id)
        const data = await Products.findAll({
            where: {
                manufacturerId: req.params.id,
              },
              include: [
                {
                  model: Manufacturer,
                },
              ],
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addCustProduct = async(req,res) => {
  try {
    // console.log(req.body)
      const newProduct = {
          _id:req.body._id,
          name:req.body.name,
          price:req.body.price,
          category:req.body.category,
          mid:req.body.mid,
          did:req.body.did,
          distributerName:req.body.distributerName

      }
      // console.log(newProduct,"new")
      const data = await CustProduct.bulkCreate([newProduct]);
      console.log(data,"here")
      res.status(200).json(data)
  } catch (error) {
      res.status(500).send(error.message)
  }
}

export const getCustProduct = async(req,res) => {
  try {
    const data = await CustProduct.findAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// export const deletcustproduct = async(req,res) => {
//     try {
//       const data = await CustProduct.destroy({
//         where:{
//           _id:3
//         }
//       })
//       res.status(200).json(data)
//     } catch (error) {
//       res.status(500).send(error.message)
//     }
// }
