import { Link, useNavigate } from "react-router-dom"
import toRupiah from "../../../utils/currency"
import React, { useEffect, useState } from "react"
import MedicineService from "../../../services/MedicinceService.service"
import useService from "../../../hooks/useService"

const MedicineCard = ({name,image, stock, price, onEdit, onDelete}:{name:string,image:string, stock:number, price:number,onEdit:()=>void,onDelete:()=>void})=>{
  let confirmDelete = async()=>{
    let conf = confirm(`Are you sure want to remove all ${name}'s stocks?`)
    if(conf) onDelete()
  }
  return (
    <div className='mt-3 py-4 bg-white flex rounded-md justify-between items-center flex-col md:flex-row'>
      <div className="ml-10 flex items-center space-x-5">
        <img className='w-20 max-w-20 max-h-16 border-2 border-gray-100 rounded-md hidden md:block' src={image}/>
        <div className='font-bold'>{name}</div>
      </div>
      <div className="flex justify-end space-x-5 mr-10  items-center">
        <div className=''>Stock : {stock}</div>
        <div className=''>{toRupiah(price)}</div>
        <button className="bg-sky-600 text-white text-xs px-3 py-2 rounded-md font-bold inline-block" onClick={onEdit}>Edit</button>
        <button className="bg-rose-600 text-white text-xs px-3 py-2 rounded-md font-bold inline-block" onClick={confirmDelete}>Remove Stock</button>
      </div>
    </div>
  )
}
const AdminMasterMedicine: React.FC = () => {
  const [medicines, setMedicines] = useState([{
    medicine_id: 0,
    image: "https://d2qjkwm11akmwu.cloudfront.net/products/855591_16-6-2020_9-59-58-1665779307.webp",
    name: 'Paracetamol',
    stock: 11,
    price: 10000
  }])
  let nav = useNavigate()

  const onDelete = async(id:number)=>{
    await useService(MedicineService.deleteMedicine(id),nav,()=>{
      setMedicines(medicines.map((medicine)=>{
        if(medicine.medicine_id==id){
          medicine.stock = 0
        }else medicine.stock = 0
        return medicine
      }))
    },undefined,true,undefined)
  }
  useEffect(()=>{
    (async()=>{
      let m = await useService(MedicineService.fetchMedicine(),nav,undefined,undefined,true,undefined,false)
      setMedicines(m.data)
    })()
  },[])
  return (
    <div className="mt-10 px-28 bg-sky-100 w-full mr-10 "> 
      <div className=" flex justify-between">
        <div className="">Master Medicine</div>
        <div className="flex space-x-2">
          <Link className="bg-sky-600 text-white text-xs px-8 py-2 rounded-md font-bold inline-block" to="/admin/medicine/add">Add</Link>
          <Link className="bg-sky-600 text-white text-xs px-8 py-2 rounded-md font-bold inline-block" to="/admin/medicine/add/mass">Mass Add</Link>
        </div>
      </div>
      
      <div className="mt-6">
        {medicines.map((medicine,index)=>{
          return <MedicineCard key={medicine.medicine_id+"_"+index} image={medicine.image} name={medicine.name} stock={medicine.stock} price={medicine.price} onDelete={()=>onDelete(medicine.medicine_id)} onEdit={()=>nav(`/admin/medicine/${medicine.medicine_id}`)}/>
        })} 
      </div>
    </div>
  )
}

export default AdminMasterMedicine