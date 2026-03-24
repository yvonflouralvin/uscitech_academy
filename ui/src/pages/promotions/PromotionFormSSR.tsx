import { PageProps } from "@/lib/shared/types/config";
import PromotionFormCS from "./PromotionFormCS";
import { Promotion } from "../../types";
import api from "@/lib/network/api";
import { cookies } from "next/headers";

interface Props extends PageProps {

} 

export default async function PromotionFormSSR(props: Props){
    var promotion: Promotion|undefined = undefined ;
    try{
        promotion  = ((await api(await cookies()).get(`/uscitech_academy/promotions/${props.params.app[3]}/`)).data)
    }catch(e){}
    return <>
        <PromotionFormCS {...props} promotion={promotion}/>
    </>
}