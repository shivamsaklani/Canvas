import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import toast from "react-hot-toast";

export const generateOTP =async (email:string)=>{
   let response;
       try {
        response= await axios.post( `${HTTP_BACKEND}/otp/generate`,{
             "email":email
           });  
           toast.success("Otp sent");
           return response;
           
       } catch (err:any) {
         throw err;
       } 
     
}