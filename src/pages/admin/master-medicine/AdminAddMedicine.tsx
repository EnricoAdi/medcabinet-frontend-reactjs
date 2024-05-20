import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useService from "../../../hooks/useService"
import MedicineService from "../../../services/MedicinceService.service"

const AdminAddMedicine: React.FC = () => {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcFIZUWQ27n8B5KL9Y6POOnT_yokKZATdtxslespl0w&s")
  const [price, setPrice] = useState(1000)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()
  const add = async()=>{
    if(name=="" || price==0 || quantity==0 || image ==""){
      alert("Please provide complete data")
      return
    }
    setIsLoading(true)
    await useService(MedicineService.addMedicine(name, price, quantity,image),nav,()=>{
      nav("/admin")
    },undefined,true)
    setIsLoading(false)
  }
  return (
    <>
      <div className="pl-28 top-20 absolute">Add Medicine</div>
      <Link className="bg-sky-600 text-white text-xs px-8 py-2 rounded-md absolute top-20 right-40 font-bold inline-block" to="/admin">Back</Link>
      
      <div className="w-full flex justify-center my-20">
          <div className="center w-80 bg-white py-4 rounded-md p-5">
              <div>
                <img src={image} className="w-32 max-w-32 border-gray-200 border-2 mx-auto"/>
                <div className="text-sm">Image</div>
                <input type="text" className="border-2 rounded w-full" value={image} onChange={(e)=>setImage(e.target.value)}/>

                <div className="text-sm my-1">Name</div>
                <input type="text" className="border-2 rounded w-full" onChange={(e)=>setName(e.target.value)}/>
                
                <div className="text-sm my-1">Price</div>
                <input type="number" min={1000} value={price} className="border-2 rounded w-full" onChange={(e)=>setPrice(parseInt(e.target.value))}/>

                <div className="text-sm my-1">Quantity</div>
                <input type="number" min={1} value={quantity} className="border-2 rounded w-full" onChange={(e)=>setQuantity(parseInt(e.target.value))}/>

                <button className="bg-sky-600 w-full my-4 text-white text-xs py-2 rounded-md font-bold inline-block" onClick={add}>{isLoading?"Loading":"Add"}</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default AdminAddMedicine