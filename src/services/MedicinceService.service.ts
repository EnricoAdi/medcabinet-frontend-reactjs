import { privateClient } from "./_client"

const MedicineService = {
  fetchMedicine(){
    return privateClient.get('/medicine')
  },
  fetchMedicineWithFilter(q:URLSearchParams){
    return privateClient.get('/medicine',{params:q})
  },
  getMedicine(id:number){
    return privateClient.get(`/medicine/${id}`)
  },
  addMedicine(name:string, price:number, stock:number, image:string){
    return privateClient.post('/medicine',{name, price, stock, image})
  },
  addMassMedicine(medicines:any){
    return privateClient.post('/medicine/mass', medicines)
  },
  editMedicine(id:number, name:string, price:number, image:string){
    return privateClient.patch(`/medicine/${id}`,{name, price, image})
  },
  deleteMedicine(id:number){
    return privateClient.delete(`/medicine/${id}`)
  },
  addStock(id:number, stock:number){
    return privateClient.patch(`/medicine/${id}/stock`,{stock})
  }
}
export default MedicineService