import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function home(){
    return <div className="flex h-screen w-screen">
      
      <Input type="text" placeholder="roomId"></Input>
      <Button>Submit</Button>

    </div>
}