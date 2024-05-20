import React, { useMemo, useState } from 'react'
import Papa from "papaparse";
import { Link, useNavigate } from 'react-router-dom';
import toRupiah from '../../../utils/currency';
import MedicineService from '../../../services/MedicinceService.service';
import useService from '../../../hooks/useService';

const disableButton = (medicines:any[])=>{
  if(medicines.length==0) return true
  return false
}
const MedicineCard = ({name,image, stock, price}:{name:string,image:string, stock:number, price:number})=>{
  return (
    <div className='mt-3 py-4 bg-white flex rounded-md justify-between items-center flex-col md:flex-row'>
      <div className="ml-10 flex items-center space-x-5">
        <img className='w-20 max-w-20 max-h-16 border-2 border-gray-100 rounded-md hidden md:block' src={image}/>
        <div className='font-bold'>{name}</div>
      </div>
      <div className="flex justify-end space-x-5 mr-10  items-center">
        <div className=''>Stock : {stock}</div>
        <div className=''>{toRupiah(price)}</div> 
      </div>
    </div>
  )
}
const AdminMassAddMedicine = () => {
  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()
  const [medicines, setMedicines] = useState<{
    image: string,
    name: string,
    stock: number,
    price: number
  }[]>([])
  const isDisabled = useMemo(()=>disableButton(medicines),[medicines])
  const changeHandlerCSV = (event:any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const res = results.data as {
          image: string,
          name: string,
          stock: number,
          price: number
        }[]
        setMedicines(res)
      },
    })
  }
  const upload = async()=>{
    setIsLoading(true)
    const data = new FormData()
    data.append("medicines",JSON.stringify(medicines))
    await useService(MedicineService.addMassMedicine(data),nav,()=>{
      nav("/admin")
    },undefined,true)
    setIsLoading(false)
  }
  return (
    <div className='mt-10 px-20 mr-12 bg-sky-100 w-full'>
      <div className=" flex justify-between">
        <div className="">Master Medicine</div>
        <div className="flex">
          <Link className="bg-sky-600 text-white text-xs px-8 py-2 rounded-md font-bold inline-block" to="/admin">Back</Link> 
        </div>
      </div>


      <div className="mt-3">
        <label className='font-bold '>Input CSV</label>
        <div className='flex space-x-3 mt-3 mb-3'>
        <input
          type="file"
          accept='.csv'
          onChange={changeHandlerCSV}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 rounded-md file:border-0 file:text-sm font-semibold bg-white hover:file:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
        <button className='bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs px-8 py-2 rounded-md font-bold inline-block' disabled={isDisabled} onClick={upload}>{isLoading? "Loading...":"Upload"}</button>
        </div>
          <Link to="https://drive.google.com/file/d/14-Anajd-dG5fSBJCA-AWdR7B1c_o57Xq/view?usp=sharing" target='_blank' className='text-blue-500 hover:underline'>View Template</Link>
     </div>

      <div className="mt-10">
        {medicines.map((medicine,index)=>{
          return <MedicineCard key={"_"+index} image={medicine.image} name={medicine.name} stock={medicine.stock} price={medicine.price}/>
        })} 
      </div>
    </div>
  )
}

export default AdminMassAddMedicine