import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTTP_BACKEND } from "@repo/backend-common/config";
import image from "../../../public/images/photo.jpg";
import Image from "next/image";
export default function ProfileBox({setprofilebox}:{
    setprofilebox:()=>void
}){


    return(
        <div className="fixed z-50 bg-opacity-80 flex p-10 h-screen w-screen bg-black justify-center items-center flex-rows">

            <div className="flex relative bg-white p-10 rounded-lg">
                <button onClick={setprofilebox} className="absolute top-2 right-4">X</button>
                
                <Image src={image} className="rounded-lg h-24 w-24" alt="profile image"/>
               
                <form className="gap-y-3 grid" action={`${HTTP_BACKEND}`} method="POST" >
                <Input type="file" />
                <Button className="rounde-lg" type="submit">Update</Button>

                </form>
                

            </div>

        </div>
    )
}