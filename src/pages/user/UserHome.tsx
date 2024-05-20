import React, { useEffect, useState } from 'react'
import toRupiah from '../../utils/currency'
import { useNavigate } from 'react-router-dom'
import useService from '../../hooks/useService'
import MedicineService from '../../services/MedicinceService.service'
import TransactionService from '../../services/TransactionService.service'

const CartItem = ({name,quantity,price, add, substract}:{name:string,quantity:number,price:number, add:()=>void, substract:()=>void})=>{
  return(
    <div className="mt-2 h-14 w-full p-2 flex items-center justify-between">
      <div className="ml-2 text-sm">
          {name} <br />
          <span className="text-xs">{toRupiah(price)}</span>
      </div>
      <div className='flex'>
        <button className="border-sky-100 border-2 w-8 h-8 mr-2" onClick={substract}>-</button>
        <button className="bg-sky-100 w-8 h-8 mr-2 ">{quantity}</button>
        <button className="border-sky-100 border-2 w-8 h-8 mr-2" onClick={add}>+</button>
      </div>
    </div>
  )
}
const ItemButton = ({image,name,price,quantity,onAdd}:{image:string,name:string,price:number,quantity:number, onAdd:()=>void})=>{
  return(
    <button className='bg-white w-32 drop-shadow-md rounded-md mb-5 mr-5' onClick={onAdd}>
      <img src={image} className='w-24 h-24 mx-auto'/>
      <div className='mt-1 mx-auto'>{name.substring(0,20)} {name.length>20? "...":""}</div>  
      <div className='text-xs mx-auto my-2'>Stock: {quantity}</div>
      <div className='text-xs mx-auto my-2'>{toRupiah(price)}</div>
    </button>
  )
}
const UserHome:React.FC = () => {
  let nav = useNavigate()
  const [total, setTotal] = useState(0)
  const [search,setSearch]  = useState("")
  const [medicines, setMedicines] = useState([{
    medicine_id: 0,
    image: "https://d2qjkwm11akmwu.cloudfront.net/products/855591_16-6-2020_9-59-58-1665779307.webp",
    name: 'Paracetamol',
    stock: 11,
    price: 10000
  }])
  const [cart, setCart] = useState([{
    medicine_id: 0,
    name: 'Paracetamol',
    quantity: 11,
    price: 10000
  }])
  
  const addToCart = ({medicine_id,name,price}:{medicine_id:number, name:string, price:number})=>{
    //cek cart
    let findItem = cart.findIndex((item)=>item.medicine_id==medicine_id)
    if(findItem>=0){
      cart[findItem].quantity += 1
    }else{
      cart.push({medicine_id,name,price,quantity:1})
    }
    setCart([...cart])
    setTotal(total+price)
  }
  const removeQuantityCart = ({medicine_id,price}:{medicine_id:number, name:string, price:number})=>{
    //cek cart
    let findItem = cart.findIndex((item)=>item.medicine_id==medicine_id)
    if(findItem>=0){
      cart[findItem].quantity -= 1
      if(cart[findItem].quantity<=0){
        cart.splice(findItem,1)
      }
    }
    setCart([...cart])
    setTotal(total-price)
  }
  const buy = async()=>{
    if(cart.length<=0){
      alert("Please add an item to cart")
      return
    }
    let ask = confirm("Are you sure to proceed to payment ?")
    if(ask){
      const data = new FormData()
      data.append("detail",JSON.stringify(cart.map((item)=>{
        return {
          medicine_id : item.medicine_id,
          quantity : item.quantity
        }
      })))
      await useService(TransactionService.createTransaction(data),nav,async()=>{
        clearCart()
        let m = await useService(MedicineService.fetchMedicine(),nav,undefined,undefined,true,undefined,false)
        setMedicines(m.data)
      },undefined,true,undefined)
    }
  }
  const clearCart = ()=>{
    setCart([])
    setTotal(0)
  }

  const searchAction = async()=>{
    let objFilter = new URLSearchParams()
    objFilter.append("name",search)
    let m = await useService(MedicineService.fetchMedicineWithFilter(objFilter),nav,undefined,undefined,true,undefined,false)
    setMedicines(m.data)
  }

  useEffect(()=>{
    (async()=>{
      let m = await useService(MedicineService.fetchMedicine(),nav,undefined,undefined,true,undefined,false)
      setMedicines(m.data)
      setCart([])
    })()
  },[])
  return ( 
    <div className="px-28 bg-sky-100 w-full flex space-x-20">
      <div className='mt-8  w-2/3'>
        <div className="text-sm">Search Based On Item Name</div>
          <div className="col-span-1 mt-2"> 
            <input className="w-3/6 rounded pl-3 p-1" type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Input Medicine Name" />
            <button className="text-xs text-white bg-sky-500 rounded px-3 py-2 mx-4 hover:bg-sky-700" onClick={searchAction}>
                Search
            </button>
          </div>
        <div className="text-sm mt-4">Showing {medicines.length} Medicines</div>
        <div className='mt-4 flex flex-wrap'>
          {medicines.map((medicine,index)=>{
            return <ItemButton key={medicine.medicine_id+"_"+index} name={medicine.name} price={medicine.price} onAdd={()=>addToCart(medicine)} quantity={medicine.stock} image={medicine.image}/>
          })}
        </div>
      </div>
        
        <div className='mt-8 w-1/3 pb-3'>
          <div className="max-h-96 bg-white rounded overflow-y-auto">
            {cart.map((c,index)=>{
              return <CartItem key={c.medicine_id+"_"+index} name={c.name} price={c.price} quantity={c.quantity} add={()=>addToCart(c)} substract={()=>removeQuantityCart(c)}/>
            })}
          </div>
          <div className="w-full text-sm bg-white pb-3 pt-10">
              <div className='flex justify-end mr-2'>
                Total : {toRupiah(total)}
              </div>
              <div className='flex mx-2'>
                <button className=" text-white bg-sky-500 rounded-md w-full p-2 mt-2 hover:bg-sky-700 font-bold" onClick={buy}>
                    Buy
                </button> 
              </div>
            </div>
        </div>
        
    </div> 
  )
}

export default UserHome