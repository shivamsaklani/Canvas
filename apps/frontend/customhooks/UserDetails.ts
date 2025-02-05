import { HTTP_BACKEND } from "@repo/backend-common/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useUserDetails(){
    const [user,setuser] = useState<userDetails>();
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
        setuser(users);
      } catch (e) {
        console.log(e);
         setuser({
          name:"",
          email : "",
          imageurl: undefined
         })
      }

    
    }
    userDetails();
  },[]);

  return user;
}