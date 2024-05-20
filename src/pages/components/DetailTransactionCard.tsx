import toRupiah from "../../utils/currency";

const DetailTransactionCard = ({name, price, quantity, image}:{name:string, image:string, price:number, quantity:number})=>{
  return (
    <div className="mt-2 border-2  flex p-2 justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={image} className="w-12 h-12" />
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-xs">{toRupiah(price)}</div>
        </div>
      </div>
      <button className="cursor-default bg-blue-100 w-8 h-8">{quantity}</button>
  </div>
  )
}
export default DetailTransactionCard;