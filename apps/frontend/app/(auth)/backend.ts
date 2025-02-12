import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";

export const generateOTP =async (email:string)=>{
   let response;
       try {
        response= await axios.post( `${HTTP_BACKEND}/otp/generate`,{
             "email":email
           });  
           if(response?.status === 401){
            alert("User Already exist");
           }
       } catch (err) {
        
        alert ("Try again");
           
        
        
       } 
}