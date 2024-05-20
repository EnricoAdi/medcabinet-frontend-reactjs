import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DetailTransactionCard from '../components/DetailTransactionCard'
import toRupiah from '../../utils/currency'
import useService from '../../hooks/useService'
import TransactionService from '../../services/TransactionService.service'

const UserDetailTransaction: React.FC = () => {
  const {id} = useParams()
  const [total,setTotal] = useState(0)
  const [name, setName] = useState("")
  const [date,setDate] = useState("2021-12-12")
  const [detail, setDetail] = useState([
    {
      medicine_id: 0,
      name: 'Paracetamol1',
      quantity: 11,
      price: 10000,
      image: 'https://www.halodoc.com/obat-dan-vitamin/paracetamol-500-mg-1-strip-10-tablet-1626174138.jpg'
    }
  ])
  const nav = useNavigate()
  useEffect(()=>{
    //get detail
    (async()=>{
      let res = await useService(TransactionService.getDetail(parseInt(`${id}`)),nav,undefined,undefined,true,undefined,false)
      let data = res.data
      setDate(data.created_at.substring(0,10))
      setTotal(data.total_price)
      setName(data.user.name)
      let d:{
        medicine_id: number,
        name: string,
        image:string,
        quantity: number,
        price: number
      }[] = []
      data.dtransaction.forEach((dt:any)=>{
        d.push({
          medicine_id: dt.medicine_id,
          name: dt.medicine.name,
          quantity: dt.quantity,
          price: dt.price,
          image: dt.medicine.image
        })
      })
      setDetail(d)
    })()
  },[])
  return (
    <>
      <div className="pl-28 top-20 absolute">Transaction Detail</div>
      <Link className="bg-sky-600 text-white text-xs px-8 py-2 rounded-md absolute top-20 right-40 font-bold inline-block" to="/user/transaction">Back</Link>


      <div className="w-full flex justify-center my-20">  
        <div className="center w-96 max-h-96 overflow-y-auto scroll-smooth bg-white py-4">
          <div className="px-3 text-sm">
            <div>Name : {name}</div>
            <div>Total : {toRupiah(total)}</div>
            <div>Transaction Date : {date}</div>
            {detail.map((d,index)=>{
              return <DetailTransactionCard key={d.medicine_id+"_"+index} image={d.image} name={d.name} price={d.price} quantity={d.quantity}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetailTransaction