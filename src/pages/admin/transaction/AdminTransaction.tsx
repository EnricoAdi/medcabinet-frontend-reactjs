import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useService from '../../../hooks/useService'
import TransactionService from '../../../services/TransactionService.service'
import toRupiah from '../../../utils/currency'

const TransactionCard = ({num, date, id, total}:{num:number, date:string, id:number, total:number})=>{
  return (
    <div className='mt-3 py-4 bg-white flex rounded-md justify-between items-center'>
      <div className='flex space-x-4 items-center'>
        <div className='ml-10 text-lg'>Transaction #{num}</div>
        <div className='text-sm'>{date.substring(0,10)}</div> 
        <div className='text-sm'>{toRupiah(total)}</div> 
      </div>
      <div className="flex justify-end space-x-5 mr-10  items-center">
        <Link to={`/admin/transaction/${id}`} className="bg-sky-600 text-white text-xs px-3 py-2 rounded-md font-bold inline-block">Detail</Link>
      </div>
    </div>
  )
}

const AdminTransaction: React.FC = () => {
  const [transactions, setTransactions] = useState([{
    transaction_id: 0,
    created_at: "20-12-2002",
    total_price: 10000
  }])
  const nav = useNavigate()
  useEffect(()=>{
    (async()=>{
      let t = await useService(TransactionService.fetchTransactionAdmin(),nav,undefined,undefined,true,undefined,false)
      setTransactions(t.data) 
    })()
  },[])
  return (
    <>
      <div className="pl-28 top-20 absolute">Transaction</div>
      
      
      <div className="mt-20 ml-28 mr-40">
        {transactions.map((t,index)=>{
          return <TransactionCard key={t.transaction_id+"_"+index} total={t.total_price} num={index+1} date={t.created_at} id={t.transaction_id}/>
        })} 
      </div>
    </>
  )
}

export default AdminTransaction