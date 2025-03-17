import { PageProps } from "@/lib/shared/types/config"; 
import PromotionsListCS from "./PromotionsListCS";
import { Promotion } from "../../types";
import api from "@/lib/network/api";
import { cookies } from "next/headers";


interface Props extends PageProps {

}
export default async function PromotionsListSSR(props: Props){
    
    return <>
        
        <PromotionsListCS {...props} />
    </>
}