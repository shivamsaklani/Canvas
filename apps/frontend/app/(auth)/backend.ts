import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";

export const generateOTP =async (email:string)=>{
   
       try {
         await axios.post( `${HTTP_BACKEND}/otp/generate`,{
             "email":email
           });  
       } catch (err) {
           
          console.log(err);
        
       } 
}