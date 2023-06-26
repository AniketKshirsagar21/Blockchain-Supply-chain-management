import React, { useContext, createContext, useState, useEffect } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useContract, useMetamask, useContractWrite ,useContractRead} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
const StateContext = createContext();


export const StateContextProvier = ({children}) => {
    const {contract} = useContract('0x6d7BB196cF6c9b4A56F08d9B0d3c587460dB626a');
    const connect = useMetamask();
    const address = useAddress();
    const [lat,setLat] = useState(null)
    const [lng,setLng] = useState(null)
    const [addr,setAddr] = useState(address)
    const datam =  JSON.parse(window.localStorage.getItem('manufacturer'));
    const datad =  JSON.parse(window.localStorage.getItem('distributer'));
    const datac =  JSON.parse(window.localStorage.getItem('customer'));
    const logged = JSON.parse(window.localStorage.getItem('logged'));
    const [manufacturer,setManufacturer] = useState(datam)
    const [distributer,setDistributer] = useState(datad)
    const [customer,setCustomer] = useState(datac) 
    const [loggedin, setLoggedin] = useState(false)
    useEffect(() => {
     setAddr(address)
   }, [address])
   useEffect(() => {
    connect()
    const datam =  JSON.parse(window.localStorage.getItem('manufacturer'));
    if(datam)
      setManufacturer(datam)
    const datad =  JSON.parse(window.localStorage.getItem('distributed'));
    if(datad)
      setDistributer(datad)
    const datac =  JSON.parse(window.localStorage.getItem('customer'));
    if(datac)
      setCustomer(datac)
    const logged = JSON.parse(window.localStorage.getItem('logged'));
    if(logged)
      setLoggedin(logged.log)
   },[])

  useEffect(()=>{
    if(manufacturer)
     window.localStorage.setItem('manufacturer', JSON.stringify(manufacturer));
  },[manufacturer]) 

  useEffect(()=>{
    if(distributer)
     window.localStorage.setItem('distributer', JSON.stringify(distributer));
  },[distributer]) 

  useEffect(()=>{
    if(customer)
     window.localStorage.setItem('customer', JSON.stringify(customer));
  },[customer]) 


  useEffect(()=>{
    const getLocation = () => {
      
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setLat(pos.coords.latitude)
          setLng(pos.coords.longitude)
          console.log(pos.coords.latitude)
          console.log(pos.coords.longitude)

        })  
        
      }
    }
    getLocation()
  },[])
    const {mutateAsync: manufactureProduct} = useContractWrite(contract,"manufactureProduct")
    const addProduct = async(obj) => {
        try {
          const data = await manufactureProduct({args:[
            obj.name,
            obj.description,
            obj.longitude,
            obj.latitude,
            obj.productname,
            obj.productcode,
            obj.productprice,
            obj.productquantity,
            obj.productcat

          ]})
          console.log("contract call successfull",data)
        } catch (error) {
          console.log("contract call unsuccessfull",error)
        }
    }
    const {mutateAsync: addManufacturerRole} = useContractWrite(contract,"addManufacturerRole")
    const addManufactureRole = async(_address) => {
      try {
        console.log(_address,"from context")
        const data = await addManufacturerRole({args:[_address]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const {mutateAsync: addDistributerRole} = useContractWrite(contract,"addDistributerRole")
    const addDistributeRole = async(address) => {
      try {
        const data = await addDistributerRole({args:[address]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const {mutateAsync: addCustomerRole} = useContractWrite(contract,"addCustomerRole")
    const addCustomRole = async(address) => {
      try {
        const data = await addCustomerRole({args:[address]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const {mutateAsync: purchaseBydistributer} = useContractWrite(contract,"purchaseBydistributer")
    const purchase_by_distributer = async(_uid) => {
      try {
        const data = await purchaseBydistributer({args:[_uid]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const {mutateAsync: shipTodistributer} = useContractWrite(contract,"shipTodistributer")
    const ship_to_distributer = async(obj) => {
      try {
        const data = await shipTodistributer({args: [
          obj._uid,
          obj._amount
        ]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }


    const {mutateAsync: receiveBydistributer} = useContractWrite(contract,"receiveBydistributer")
    const receive_by_distributer = async(obj) => {
      try {
        const data = await receiveBydistributer({args: [
          obj._uid,
          obj.distributerLongitude,
          obj.distributeLatitude
        ]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const {mutateAsync: purchaseByCustomer} = useContractWrite(contract,"purchaseByCustomer")
    const purchase_by_customer = async(_uid) => {
      try {
        const data = await purchaseByCustomer({args:[_uid]});
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }


    const {mutateAsync: shipBydistributer} = useContractWrite(contract,"shipBydistributer")
    const ship_by_distributer = async(obj) => {
      try {
        const data = await shipBydistributer({args : [
          obj._uid,
          obj._amount
        ]})
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }


    const {mutateAsync: receiveByCustomer} = useContractWrite(contract,"receiveByCustomer")
    const receive_by_customer = async(_uid) => {
      try {
        const data = await receiveByCustomer({args:[_uid]});
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }

    const fetchProductPart1 = async(obj) =>{
      let data = await contract.call("fetchProductPart1",[obj._uid ,obj._type ,obj.i]);
      return data;
    }

    const fetchProductPart2 = async(obj) =>{
      let data = await contract.call("fetchProductPart2",[obj._uid ,obj._type ,obj.i]);
      return data;
    }


    const fetchProductCount = async() =>{
      let data = await contract.call("fetchProductCount");
      return data;
    }

    const fetchProductHistoryLength = async(_uid) =>{
      let data = await contract.call("fetchProductHistoryLength",[_uid]);
      return data;
    }

    const fetchProductState = async(_uid) =>{
      let data = await contract.call("fetchProductState",[_uid]);
      return data;
    }



    const {mutateAsync: setTransactionHashOnManufacture} = useContractWrite(contract,"setTransactionHashOnManufacture")
    const set_Transaction_Hash_On_Manufacture = async(tran) => {
      try {
        const data = await setTransactionHashOnManufacture({args:[tran]});
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }


    const {mutateAsync: setTransactionHash} = useContractWrite(contract,"setTransactionHash")
    const set_Transacti_onHash = async(obj) => {
      try {
        const data = await setTransactionHash({args:[obj._uid,obj.tran]});
        console.log("contract call successfull",data)
      } catch (error) {
        console.log("contract call unsuccessfull",error)
      }
    }
    

    return (
        <StateContext.Provider
          value={{ 
            setLoggedin,
            loggedin,
            addr,
            contract,
            lat,
            lng,
            connect,
            addProduct,
            addManufactureRole,
            addDistributeRole,
            addCustomRole,
            purchase_by_distributer,
            ship_to_distributer,
            receive_by_distributer,
            purchase_by_customer,
            ship_by_distributer,
            receive_by_customer,
            manufacturer,
            setManufacturer,
            setDistributer,
            distributer,
            customer,
            setCustomer,
            fetchProductPart1,
            fetchProductPart2,
            fetchProductCount,
            fetchProductHistoryLength,
            fetchProductState,

            set_Transaction_Hash_On_Manufacture,
            set_Transacti_onHash
            // getProducts
          }}
        >
          {children}
        </StateContext.Provider>
      )
}

export const useStateContext = () => useContext(StateContext);