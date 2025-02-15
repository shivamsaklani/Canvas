
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";

import Image from "next/image";
import useUserDetails from "@/customhooks/UserDetails";
import React, { useRef, useState } from "react";
import axios from "axios";
const image="/public/profile/IMG_0241.jpg";
export default function ProfileBox({setprofilebox}:{
    setprofilebox:()=>void
}){
    const formref = useRef<HTMLFormElement>(null);
    const [file , setfile] =useState<string>(image);
    const user = useUserDetails();
    if(!user){
        return;
    }

    const uploadprofile =async (event:React.FormEvent)=>{
      event.preventDefault();
      if(!formref.current) return;
      const formdata = new FormData();
      const file = formref.current.elements.namedItem("profileImage") as HTMLInputElement;
      const token = localStorage.getItem("token");
      if(!file.files || file.files.length === 0 || !token) {
        alert("select file");
        return;
      }
        
     else{
      const uploadfile = file.files[0];
      console.log(uploadfile);
      formdata.append("profileImage",uploadfile);
      try {
        const response = await axios.post(`${HTTP_BACKEND}/upload/image`,formdata,{
          headers:{
            "Authorization":token,
            "Content-Type": "multipart/form-data"
          }
        });
        alert("file uploaded succesfully");
        setfile(response.data.imageurl);
      } catch (e) {
        console.log(e);
      }
     }
      



    }

    const handlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
      
      const temp =e.target.files?.[0];
      if(!temp) return;
      setfile(URL.createObjectURL(temp));
    }




    return(
        <div className="fixed z-50 bg-opacity-80 flex p-10 h-screen w-screen bg-black justify-center items-center flex-rows">

            <div className="flex relative justify-center items-center bg-white p-10 rounded-lg">
            
                <button onClick={setprofilebox} className="absolute w-10 h-10 hover:bg-black hover:rounded-full top-2 right-2 hover:text-white">X</button>
                <div className="grid grid-cols gap-y-3 gap-x-3 items-center justify-center items-center justify-center">
                  
               <div className="grid grid-rows-3 justify-between">
               <Image src={file || image} className="rounded-full" width={36} height={36} alt="profile image"/>
                <div className="items-center grid grid-cols-2">

                <div>
                  <h1>
                    Name
                  </h1>
                  <h1>
                    Email
                  </h1>
                </div>
                <div>

                  <h1>{user.name}</h1>
                  <h1> {user.email}</h1>
                </div>
                </div>
               </div>
               <form ref={formref} className="grid grid-cols gap-y-3" onSubmit={uploadprofile}>
               <Input type="file" name="profileImage" onChange={handlechange} />
               <Button className="rounde-lg" type="submit">Update</Button>
               </form>
               

                </div>
                
                
                

            </div>

        </div>
    )
}