import axios from "axios";
// import { useContext } from "react";
// import { Dict } from "_types/common/main";
import { NavigateFunction } from "react-router-dom";
import HttpStatus from "../enums/httpStatus.enum";
import AuthService from "../services/AuthService.service";

/**
 *  Hook ini digunakan untuk melakukan HTTP request, lalu secara otomatis menampilkan pesan berhasil atau error. Hook ini juga dapat diubah apabila ingin mengembalikan sebuah nilai pada halaman yang memanggil hook ini.
 * @param request 
 * @param navigate
 * @param successCallback void
 * @param errorCallback void
 * @param withResponseData boolean
 * @param customSuccessMessage string
 * @param withMessage boolean
 */
export default async function useService(
    request: Promise<any>,
    navigate: NavigateFunction,
    successCallback?: ()=>void,
    errorCallback?: ()=>void,
    withResponseData?: boolean,
    customSuccessMessage?: string,
    withMessage: boolean = true
) {
      try {
        let response = await request
        if(withMessage){
          if(customSuccessMessage) alert(customSuccessMessage)
          else {
            alert(response.data.message)
          }
        }
        if(successCallback) successCallback()
        if(withResponseData) return response.data
      } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response && e.response.status == HttpStatus.UNAUTHORIZED) {
                //force logout
                AuthService.logout(navigate);
                navigate(`/?redirect=${encodeURIComponent(window.location.pathname)}`);
            }
            else if (e.response && e.response.status == HttpStatus.FORBIDDEN) {
                navigate(-1);
            }
            else{
              alert(e.response?.data.message)
            }
        }
        if(errorCallback) errorCallback()
  };
}