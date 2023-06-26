import axios from "axios"

const url = "http://localhost:3001"

export const addManufacturer = async(obj) => {
    try {
        console.log(obj.fullname,"from api")
        const data = await axios.post(`${url}/addmanufacturer`,obj)
        return data;
    } catch (error) {
        return error;
    }
}


export const getAllManufacturer = async() => {
    try {
        const data = await axios.get(`${url}/getallmanufacturer`)
        return data        
    } catch (error) {
        return error
    }
}
export const addProductdb = async(obj) => {
    try {
        console.log(obj)
        const data = await axios.post(`${url}/addproduct`,obj)
        return data
    } catch (error) {
        return error
    }
}

export const addDistributer = async(obj) => {
    try {
        const data = await axios.post(`${url}/adddistributer`,obj)
        return data;
    } catch (error) {
        return error;
    }
}

export const getAllDistributer = async() => {
    try {
        const data = await axios.get(`${url}/getalldistributer`)
        return data;
    } catch (error) {
        return error;
    }
}

export const addproductdist = async(id,obj) => {
    try {
        const data = await axios.post(`${url}/addproductdist/${id}`,obj)
        return data        
    } catch (error) {
        return error
    }
}

export const getAllProduct = async() => {
    try {
        const data = await axios.get(`${url}/getallproduct`)
        return data        
    } catch (error) {
        return error
    }
}

export const getProduct = async(id) => {
    try {
        console.log(id)
        const data = await axios.get(`${url}/getproduct/${id}`)
        return data
    } catch (error) {
        return error
    }
}

export const addCustomer = async(obj) => {
    try {
        const data = await axios.post(`${url}/addcustomer`,obj)
        return data;
    } catch (error) {
        return error;
    }
}

export const loginManufacturer = async(walletaddress) => {
    try {

        const data = await axios.post(`${url}/loginmanufacturer`,{address:walletaddress})
        return data        
    } catch (error) {
        return error
    }
}

export const loginDistributer = async(walletaddress) => {
    try {
        const data = await axios.post(`${url}/logindistributer`,{address:walletaddress})
        return data        
    } catch (error) {
        return error
    }
}
export const loginCustomer = async(walletaddress) => {
    try {
        const data = await axios.post(`${url}/logincustomer`,walletaddress)
        return data        
    } catch (error) {
        return error
    }
}


export const getRequest = async(id) => {
    try {
        // console.log(obj)
        const data = await axios.get(`${url}/mgetrequest/${id}`)
        return data
    } catch (error) {
        return error;
    }
}

export const addRequest = async(obj) => {
    try {
        console.log(obj)
        const data = await axios.post(`${url}/maddrequest/${obj.mid}`,obj)
        return data
    } catch (error) {
        return error;
    }
}

export const deleteProduct = async(id) => {
    try {
        const data = await axios.get(`${url}/deleteproductdist/${id}`)
        return data
    } catch (error) {
        return error;
    }
}

export const shipProduct = async(obj,id) => {
    try {
        const data = await axios.post(`${url}/shipped/${id}`,obj)
        return data         
    } catch (error) {
        return error
    }
}

export const addRequestDist = async(obj,id) => {
    try {
        const data = await axios.post(`${url}/requestproductdis/${id}`,obj)      
        return data  
    } catch (error) {
        return error
    }
}

export const addCustProduct = async(obj) => {
    try {
        const data = axios.post(`${url}/addcustproduct`,obj)
        return data        
    } catch (error) {
        return error
    }
}


export const getCustProduct = async() => {
    try {
        const data = axios.get(`${url}/getcustproduct`)
        return data        
    } catch (error) {
        return error
    }
}

export const getShipped = async(id) => {
    try {
        const data = axios.get(`${url}/mgetshipped/${id}`)
        return data        
    } catch (error) {
        return error
    }
}

export const addRequestDis = async(obj,id) => {
    try {
        const data = axios.post(`${url}/addrequestdis/${id}`,obj)
        return data        
    } catch (error) {
        return error
    }
}


export const getRequestsDis = async(id) => {
    try {
        const data = await axios.get(`${url}/getrequestdis/${id}`)
        return data
    } catch (error) {
        return error;
    }
}

export const getRequestedDis = async(id) => {
    try {
        const data = await axios.get(`${url}/getrequesteddis/${id}`)
        return data
    } catch (error) {
        return error;
    }
}


export const getDistProduct = async(id) => {
    try {
        const data = await axios.get(`${url}/getdistproduct/${id}`)
        return data
    } catch (error) {
        return error
    }
}