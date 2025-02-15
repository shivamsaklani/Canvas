import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Details} from "@repo/canvas/shapes";
export default function useUserDetails(){
    const [user,setuser] = useState<Details|undefined >();
  useEffect(()=>{
    async function userDetails() {
      try {
        const response = await axios.post(HTTP_BACKEND+"/userdetails", {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          });
        const users= {
          name:response.data.name,
          email:response.data.email,
          imageurl:response.data.photo
        }

     
        if(!users) return;
       
        setuser(users);
      } catch (e) {
        console.log(e);
        setuser(undefined);
      }

    
    }
    userDetails();
    return ()=>{
      return;
    }
  },[]);

  return user;
}