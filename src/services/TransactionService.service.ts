import { privateClient } from "./_client"

const TransactionService = {
  createTransaction(detail:any){
    return privateClient.post('/transaction',detail)
  },
  fetchTransactionAdmin(){
    return privateClient.get('/transaction')
  },
  fetchTransactionByUser(){
    return privateClient.get('/transaction/user')
  },
  getDetail(id:number){
    return privateClient.get(`/transaction/${id}`)
  },
}
export default TransactionService