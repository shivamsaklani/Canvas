import axios from "axios";
import{HTTP_BACKEND} from "@repo/backend-common/config";
export async function StoredShapes(roomId:string){

    const response = await axios.get(`${HTTP_BACKEND}/canvas/${Number(roomId)}`);
    const storedshape = response.data.shape;

    const shape = storedshape.map((x:{shape:string})=>{
        const parsedData = JSON.parse(x.shape);

        return parsedData.shape;
    

    
    });
    return shape;





}