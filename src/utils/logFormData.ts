const LogFormData = (data:FormData)=>{
  for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
}
export default LogFormData;